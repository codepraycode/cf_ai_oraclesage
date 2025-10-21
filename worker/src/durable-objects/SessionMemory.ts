import { DurableObject } from 'cloudflare:workers';
import { Message, Session } from '../types';

export class SessionMemory extends DurableObject {
  private session: Session | null = null;

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/init':
        return this.initSession();
      case '/add-message':
        return this.addMessage(request);
      case '/get-messages':
        return this.getMessages();
      case '/clear':
        return this.clearSession();
      default:
        return new Response('Not found', { status: 404 });
    }
  }

  private async initSession(): Promise<Response> {
    if (!this.session) {
      this.session = {
        id: crypto.randomUUID(),
        messages: [],
        createdAt: Date.now(),
        lastActivity: Date.now()
      };
      await this.ctx.storage.put('session', this.session);
    }
    return Response.json(this.session);
  }

  private async addMessage(request: Request): Promise<Response> {
    const message: Message = await request.json();
    
    if (!this.session) {
      this.session = await this.ctx.storage.get('session') || {
        id: crypto.randomUUID(),
        messages: [],
        createdAt: Date.now(),
        lastActivity: Date.now()
      };
    }

    this.session.messages.push(message);
    this.session.lastActivity = Date.now();
    
    // Keep only last 10 messages to manage memory
    if (this.session.messages.length > 10) {
      this.session.messages = this.session.messages.slice(-10);
    }

    await this.ctx.storage.put('session', this.session);
    return Response.json({ success: true });
  }

  private async getMessages(): Promise<Response> {
    if (!this.session) {
      this.session = await this.ctx.storage.get('session') || null;
    }
    return Response.json(this.session?.messages || []);
  }

  private async clearSession(): Promise<Response> {
    await this.ctx.storage.deleteAll();
    this.session = null;
    return Response.json({ success: true });
  }
}
