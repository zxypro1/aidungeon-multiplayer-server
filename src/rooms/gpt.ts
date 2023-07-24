// Send message to chatgpt
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

export const run = async (
  input: string, 
  language: string, 
  first_request: boolean, 
  message_holder: MessagesPlaceholder,
  buffer_memory: BufferMemory
  ) => {
  const chat = new ChatOpenAI({ temperature: 0 });
  let chatPrompt;

  // Set up prompt
  if (first_request) {
    chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "You acts as a DM in a D&D game. There are two players. The story background is that the players are in a tavern."
      ),
      message_holder,
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);
  } else {
    chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "Now continue the story. Don't forget to use the information from the previous messages. Only continue for 5 minutes."
      ),
      message_holder,
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);
  }
  

  const chain = new ConversationChain({
    memory: buffer_memory,
    prompt: chatPrompt,
    llm: chat,
  });

  const input2 = input + '\n' + "Reply in " + language + ".";
  const response = await chain.call({
    input: input2
  });

  return response;
};
