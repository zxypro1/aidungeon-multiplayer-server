"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = void 0;
const schema_1 = require("@colyseus/schema");
const prompts_1 = require("langchain/prompts");
const memory_1 = require("langchain/memory");
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.mySynchronizedProperty = "Hello world";
        this.players = [];
        this.userMessages = [];
        this.messagePlaceholder = new prompts_1.MessagesPlaceholder("history"); // chatgpt memory placeholder
        this.bufferMemory = new memory_1.BufferMemory({ returnMessages: true, memoryKey: "history" }); // chatgpt memory
        this.firstRequest = true;
        this.language = "Chinese";
        this.background_en = "This is a world of magic and sword. You are in a tavern. You are seeking for a advanture to gain treasure and reputation.";
        this.background_zh = "这是一个魔法与剑的世界。你在一家酒馆里。你正在寻找一次冒险，以获得财富和声望。";
    }
}
exports.MyRoomState = MyRoomState;
__decorate([
    (0, schema_1.type)("string")
], MyRoomState.prototype, "mySynchronizedProperty", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], MyRoomState.prototype, "firstRequest", void 0);
__decorate([
    (0, schema_1.type)("string")
], MyRoomState.prototype, "language", void 0);
__decorate([
    (0, schema_1.type)("string")
], MyRoomState.prototype, "background_en", void 0);
__decorate([
    (0, schema_1.type)("string")
], MyRoomState.prototype, "background_zh", void 0);
