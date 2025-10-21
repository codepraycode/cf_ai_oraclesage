import { Env, Message } from '../types';
import { SYSTEM_PROMPT } from '../prompts/system';

export class AIService {
  constructor(private env: Env) {}
    async generateResponse(messages: Message[]): Promise<string> {
    try {
      // Format messages for Llama 3.3
      const formattedMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      console.log('Sending request to AI with messages:', formattedMessages.length);

      const response = await this.env.AI.run(
        '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
        {
          messages: formattedMessages,
          max_tokens: 1024,
          temperature: 0.7,
          top_p: 0.9,
          stream: false
        }
      );

      if (!response || !response.response) {
        throw new Error('Empty response from AI');
      }

      return response.response;

    } catch (error) {
      console.error('AI Service Error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          throw new Error('Service is busy. Please try again in a moment.');
        } else if (error.message.includes('token')) {
          throw new Error('The question is too long. Please try a shorter question.');
        }
      }
      
      throw new Error('I encountered an error while processing your question. Please try again.');
    }
  }

    formatConversationHistory(messages: Message[], maxMessages: number = 6): Message[] {
        // Keep system prompt + recent messages (prioritize assistant responses for context)
        const recentMessages = messages.slice(-maxMessages);
        
        // Ensure we have a balanced conversation
        return recentMessages;
    }

}
