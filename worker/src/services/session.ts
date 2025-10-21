import { Env, Session, Message } from '../types';

export class SessionService {
  constructor(private env: Env) {}

  async getSession(sessionId: string): Promise<Session | null> {
    try {
      const session = await this.env.ORACLESAGE_KV.get(sessionId, 'json');
      return session as Session | null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  async createSession(sessionId: string): Promise<Session> {
    const session: Session = {
      id: sessionId,
      messages: [],
      createdAt: Date.now(),
      lastActivity: Date.now()
    };

    await this.saveSession(session);
    return session;
  }

  async saveSession(session: Session): Promise<void> {
    session.lastActivity = Date.now();
    
    await this.env.ORACLESAGE_KV.put(
      session.id,
      JSON.stringify(session),
      { expirationTtl: this.env.SESSION_TTL }
    );
  }

  async addMessage(sessionId: string, message: Message): Promise<Session> {
    let session = await this.getSession(sessionId);
    
    if (!session) {
      session = await this.createSession(sessionId);
    }

    // Add new message
    session.messages.push(message);
    
    // Enforce message limit
    if (session.messages.length > this.env.MAX_MESSAGES_PER_SESSION) {
      session.messages = session.messages.slice(-this.env.MAX_MESSAGES_PER_SESSION);
    }

    await this.saveSession(session);
    return session;
  }

  async clearSession(sessionId: string): Promise<void> {
    await this.env.ORACLESAGE_KV.delete(sessionId);
  }

  generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}