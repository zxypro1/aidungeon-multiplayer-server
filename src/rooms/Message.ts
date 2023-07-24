import { Room, Client } from "@colyseus/core";

export class Message {
    text: string;
    user: Client;
    messageToChatGPT: string;

    constructor(text: string, user: Client) {
        this.text = text;
        this.user = user;

        this.messageToChatGPT = this.user.sessionId + ": " + this.text;
    }

    getText() {
        return this.text;
    }
    
    getHttpMessage() {
        let mess: Object = {
            user: this.user.sessionId,
            message: this.text
        }
        return mess;
    }

    getUser() {
        return this.user;
    }

    getMessageToChatGPT() {
        return this.messageToChatGPT;
    }
}