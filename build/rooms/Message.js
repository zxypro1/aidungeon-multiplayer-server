"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(text, user) {
        this.text = text;
        this.user = user;
        this.messageToChatGPT = this.user.sessionId + ": " + this.text;
    }
    getText() {
        return this.text;
    }
    getHttpMessage() {
        let mess = {
            user: this.user.sessionId,
            message: this.text
        };
        return mess;
    }
    getUser() {
        return this.user;
    }
    getMessageToChatGPT() {
        return this.messageToChatGPT;
    }
}
exports.Message = Message;
