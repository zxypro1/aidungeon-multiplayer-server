import { Schema, Context, type } from "@colyseus/schema";
import { Message } from "../Message";
import {
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";
import { messageJSON } from "../../types";

export class MyRoomState extends Schema {
  @type("string") mySynchronizedProperty: string = "Hello world";
  players: string[] = [];
  userMessages: Array<Message> = [];
  messagePlaceholder: MessagesPlaceholder = new MessagesPlaceholder("history"); // chatgpt memory placeholder
  bufferMemory: BufferMemory = new BufferMemory({ returnMessages: true, memoryKey: "history" }); // chatgpt memory
  @type("boolean") firstRequest: boolean = true;
  @type("string") language: string = "Chinese";
  @type("string") background_en: string = "This is a world of magic and sword. You are in a tavern. You are seeking for a advanture to gain treasure and reputation.";
  @type("string") background_zh: string = "这是一个魔法与剑的世界。玩家们在一家酒馆里。玩家们属于一个冒险团体，正在寻找一次冒险，以获得财富和声望。";
  history: Array<messageJSON> = [];
}
