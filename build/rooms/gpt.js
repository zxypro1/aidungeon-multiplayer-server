"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// Send message to chatgpt
const chains_1 = require("langchain/chains");
const openai_1 = require("langchain/chat_models/openai");
const prompts_1 = require("langchain/prompts");
const run = async (input, language, first_request, message_holder, buffer_memory, player_number, story_background) => {
    const chat = new openai_1.ChatOpenAI({ temperature: 0 });
    let chatPrompt;
    // Set up prompt
    if (first_request) {
        chatPrompt = prompts_1.ChatPromptTemplate.fromPromptMessages([
            prompts_1.SystemMessagePromptTemplate.fromTemplate("This is a multiplayer D&D game. You acts as a DM. There are/is " + player_number + " players/player. All player actions are below." +
                "The story background is that " + story_background +
                "Please include the interaction between the players/player." +
                "Stop when players/player need to make a decision."),
            message_holder,
            prompts_1.HumanMessagePromptTemplate.fromTemplate("{input}"),
        ]);
    }
    else {
        chatPrompt = prompts_1.ChatPromptTemplate.fromPromptMessages([
            prompts_1.SystemMessagePromptTemplate.fromTemplate("Now continue the story. Don't forget to use the information from the previous messages. Only continue for what happen in next 5 minutes."),
            message_holder,
            prompts_1.HumanMessagePromptTemplate.fromTemplate("{input}"),
        ]);
    }
    const chain = new chains_1.ConversationChain({
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
exports.run = run;
