import { Schema, Context, type } from "@colyseus/schema";
import { Message } from "../Message";
import {
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

export class MyRoomState extends Schema {
  @type("string") mySynchronizedProperty: string = "Hello world";
  players: string[] = [];
  userMessages: Array<Message> = [];
  messagePlaceholder: MessagesPlaceholder = new MessagesPlaceholder("history"); // chatgpt memory placeholder
  bufferMemory: BufferMemory = new BufferMemory({ returnMessages: true, memoryKey: "history" }); // chatgpt memory
  @type("boolean") firstRequest: boolean = true;
  @type("string") language: string = "Chinese";
}
