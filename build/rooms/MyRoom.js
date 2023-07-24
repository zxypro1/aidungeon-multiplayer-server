"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const core_1 = require("@colyseus/core");
const MyRoomState_1 = require("./schema/MyRoomState");
const Message_1 = require("./Message");
const gpt_1 = require("./gpt");
class MyRoom extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 4;
    }
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("type", (client, message) => {
            //
            // handle "type" message
            //
            console.log(client.sessionId, ": ", message);
            let messageObj = new Message_1.Message(message, client);
            // broadcast user message to all clients
            this.broadcast("type", messageObj.getHttpMessage());
            // store user message in state
            if (!this.state.userMessages.some(msg => msg.user === messageObj.user)) {
                this.state.userMessages.push(messageObj);
            }
            console.log(this.state.userMessages.length);
            console.log(this.state.players.length);
            // submit all messages to chatgpt
            if (this.state.userMessages.length == this.state.players.length) {
                //notify all clients that chatgpt is typing
                this.broadcast("status", 0);
                // Set up prompt
                let prompt = "";
                for (let i = 0; i < this.state.userMessages.length; i++) {
                    prompt += this.state.userMessages[i].getMessageToChatGPT() + "\n";
                }
                // Send message to chatgpt and broadcast to all clients
                (0, gpt_1.run)(prompt, this.state.language, this.state.firstRequest, this.state.messagePlaceholder, this.state.bufferMemory, this.state.players.length)
                    .then((response) => {
                    //notify all clients that chatgpt is done typing
                    this.broadcast("status", 1);
                    this.state.firstRequest = false;
                    this.state.userMessages = [];
                    console.log(response);
                    let mess = {
                        user: "ChatGPT",
                        message: response.response
                    };
                    this.broadcast("type", mess);
                });
            }
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        this.state.players.push(client.sessionId);
        let mess = {
            user: "ChatGPT",
            message: this.state.background_zh
        };
        client.send("type", mess);
    }
    onLeave(client, consented) {
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
exports.MyRoom = MyRoom;
