/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export async function askQuestion(
  question: string,
  sessionId?: string
): Promise<{ answer: string; sessionId: string }> {
  const response = await fetch(`${API_BASE}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, sessionId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get response');
  }

  return response.json();
}

export async function getSession(sessionId: string): Promise<any> {
  const response = await fetch(`${API_BASE}/session/${sessionId}`);
  
  if (!response.ok) {
    throw new Error('Failed to get session');
  }

  return response.json();
}

export async function clearSession(sessionId: string): Promise<void> {
  await fetch(`${API_BASE}/session/${sessionId}`, {
    method: 'DELETE',
  });
}