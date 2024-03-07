import { Room, Client } from "@colyseus/core";
import { messageJSON } from "../types";

export class Message {
  text: string;
  user: Client;
  messageToChatGPT: string;
  userName: string;

  constructor(text: string, user: Client) {
    this.text = text;
    this.user = user;
  }

  getText() {
    return this.text;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }

  getUser() {
    return this.user;
  }

  getMessageToChatGPT() {
    this.messageToChatGPT = this.userName + ": " + this.text;
    return this.messageToChatGPT;
  }

  getJSON() {
    let mess: messageJSON = {
      user: this.user.sessionId,
      message: this.text,
      name: this.userName
    }
    return mess;
  }
}