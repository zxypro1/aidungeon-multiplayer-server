import { Room, Client } from "@colyseus/core";
import { DNDRoomState } from "./schema/DNDRoomState";
import { Message } from "./Message";
import { run } from "./gpt";
import { messageJSON, characterJSON } from "../types";
import { Character } from "../characters/Character";


export class DNDRoom extends Room<DNDRoomState> {
  maxClients = 4;
  
  onCreate (options: any) {
    this.setState(new DNDRoomState());

    this.onMessage("type", (client, message: string) => {
      //
      // handle "type" message
      //
      console.log(client.sessionId, ": ", message);

      let messageObj = new Message(message, client);

      // store user message in state
      if (!this.state.userMessages.some(msg => msg.user === messageObj.user)) {
        // broadcast user message to all clients
        messageObj.setUserName(this.state.characters.find(char => char.getClient().sessionId === messageObj.getUser().sessionId).getName());
        this.broadcast("type", messageObj.getJSON());
        this.state.userMessages.push(messageObj);
        this.state.history.push(messageObj.getJSON());
      }
      console.log(this.state.userMessages.length)
      console.log(this.state.players.length)

      // submit all messages to chatgpt
      if (this.state.userMessages.length == this.state.players.length) {
        //notify all clients that chatgpt is typing
        this.lock();
        this.broadcast("status", 0);

        // Set up prompt
        let prompt = "";
        for (let i = 0; i < this.state.userMessages.length; i++) {
          const mess = this.state.userMessages[i].getMessageToChatGPT();
          prompt += mess + "\n";
        }

        // Send message to chatgpt and broadcast to all clients
        run(
          prompt, 
          this.state.language, 
          this.state.firstRequest, 
          this.state.messagePlaceholder, 
          this.state.bufferMemory,
          this.state.players.length,
          this.state.background,
          )
        .then((response) => {
          //notify all clients that chatgpt is done typing
          this.broadcast("status", 1);
          this.state.firstRequest = false;
          this.state.userMessages = [];
          console.log(response);
          let mess: messageJSON = {
            user: "ChatGPT",
            name: "ChatGPT",
            message: response.response
          }
          this.state.history.push(mess);
          this.broadcast("type", mess);
        });
      }
    });

    this.onMessage("background", (client, message: string) => {
      this.state.background = message;
      this.broadcast("background", message);
    });

    this.onMessage("character", (client, message: characterJSON) => {
      for (const i of this.state.characters) {
        if (i.getClient().sessionId == client.sessionId) {
          i.setName(message.name);
          i.setDescription(message.description);
          break;
        }
      }
      client.send("character", message);
    });

    this.onMessage("language", (client, message: string) => {
      this.state.language = message;
      this.broadcast("language", message);
    });

    this.onMessage("chat", (client, message: string) => {
      let messageObj = new Message(message, client);
      messageObj.setUserName(this.state.characters.find(char => char.getClient().sessionId === messageObj.getUser().sessionId).getName());
      this.state.chatMessages.push(messageObj);
      const mess: messageJSON = messageObj.getJSON()
      this.broadcast("chat", mess);
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.state.players.push(client.sessionId);
    this.state.userMessages.push(new Message("Joined!", client)); 
    let newCharacter = new Character("Barry", "A human swordsman.", client);
    this.state.characters.push(newCharacter);
    let mess: messageJSON = {
      user: "ChatGPT",
      message: this.state.background,
      name: "ChatGPT"
    }
    const chatMess: Array<messageJSON> = [];
    for (const i of this.state.chatMessages) {
      const mess: messageJSON = i.getJSON()
      chatMess.push(mess);
    }
    client.send("type", mess);
    client.send("history", this.state.history);
    client.send("background", this.state.background);
    client.send("character", newCharacter.getInfo());
    client.send("language", this.state.language);
    client.send("chat", chatMess);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    const index = this.state.players.indexOf(client.sessionId);
    if (index > -1) {
      this.state.players.splice(index, 1);
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
