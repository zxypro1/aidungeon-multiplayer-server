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
  buffer_memory: BufferMemory,
  player_number: number
  ) => {
  const chat = new ChatOpenAI({ temperature: 0 });
  let chatPrompt;

  // Set up prompt
  if (first_request) {
    chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "This is a multiplayer D&D game. You acts as a DM. There are/is " + player_number + " players/player. " +
        "The story background is that the players/player are/is in a tavern. They are seeking for a advanture to gain treasure and reputation. " + 
        "Only reply to the players/player. Continue the story for 5 minutes. Please include the interaction between the players/player." + 
        "Stop when players/player need to make a decision."
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
