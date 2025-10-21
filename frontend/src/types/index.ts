
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  messages: Message[];
  createdAt: number;
  lastActivity: number;
}

export interface AskResponse {
  answer: string;
  sessionId: string;
  timestamp: number;
  model: string;
}