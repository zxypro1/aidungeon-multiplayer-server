"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(text, user) {
        this.text = text;
        this.user = user;
    }
    getText() {
        return this.text;
    }
    setUserName(name) {
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
        let mess = {
            user: this.user.sessionId,
            message: this.text,
            name: this.userName
        };
        return mess;
    }
}
exports.Message = Message;
