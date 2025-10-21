
import { useState, useCallback } from 'react';
import { askQuestion, clearSession } from '../services/api';
import type { Message } from '../types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (question: string) => {
    if (!question.trim()) return;

    setError(null);
    setLoading(true);

    const userMessage: Message = {
      role: 'user',
      content: question,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await askQuestion(question, sessionId);
      
      setSessionId(response.sessionId);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      const errorResponse: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const clear = useCallback(async () => {
    if (sessionId) {
      await clearSession(sessionId);
    }
    setMessages([]);
    setSessionId(undefined);
    setError(null);
  }, [sessionId]);

  return {
    messages,
    loading,
    error,
    sessionId,
    sendMessage,
    clear,
  };
}