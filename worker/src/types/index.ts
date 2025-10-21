export interface Env {
  AI: any;
  ORACLESAGE_KV: KVNamespace;
  SYSTEM_PROMPT_VERSION: string;
  MAX_MESSAGES_PER_SESSION: number;
  SESSION_TTL: number;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Session {
  id: string;
  messages: Message[];
  createdAt: number;
  lastActivity: number;
}

export interface AskRequest {
  question: string;
  sessionId?: string;
}

export interface AskResponse {
  answer: string;
  sessionId: string;
  timestamp: number;
  model: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  code: string;
  dt?: string
}