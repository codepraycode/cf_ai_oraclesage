import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env, AskRequest, AskResponse, ErrorResponse } from './types';
import { AIService } from './services/ai';
import { SessionService } from './services/session';

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://cf-ai-oraclesage.pages.dev', "https://cf-ai-oraclesage.vercel.app"],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    name: 'OracleSage API',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    features: {
      ai: true,
      sessions: true,
      cors: true
    }
  });
});

// Main Q&A endpoint
app.post('/ask', async (c) => {
  try {
    const body: AskRequest = await c.req.json();
    const { question, sessionId } = body;

    // Validate input
    if (!question || question.trim().length === 0) {
      return c.json<ErrorResponse>({
        error: 'Validation Error',
        message: 'Question is required',
        code: 'INVALID_QUESTION'
      }, 400);
    }

    if (question.length > 1000) {
      return c.json<ErrorResponse>({
        error: 'Validation Error',
        message: 'Question must be less than 1000 characters',
        code: 'QUESTION_TOO_LONG'
      }, 400);
    }

    const sessionService = new SessionService(c.env);
    const aiService = new AIService(c.env);

    // Get or create session
    const currentSessionId = sessionId || sessionService.generateSessionId();
    
    // Add user message to session
    const userMessage = {
      role: 'user' as const,
      content: question.trim(),
      timestamp: Date.now()
    };

    const session = await sessionService.addMessage(currentSessionId, userMessage);

    // Generate AI response using conversation history
    const answer = await aiService.generateResponse(session.messages);

    // Add assistant response to session
    const assistantMessage = {
      role: 'assistant' as const,
      content: answer,
      timestamp: Date.now()
    };

    await sessionService.addMessage(currentSessionId, assistantMessage);

    // Return response
    const response: AskResponse = {
      answer,
      sessionId: currentSessionId,
      timestamp: Date.now(),
      model: 'llama-3.3-70b-instruct-fp8-fast'
    };

    return c.json(response);

  } catch (error) {
    console.error('Error in /ask endpoint:', error);

    const errorResponse: ErrorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
    };

    return c.json(errorResponse, 500);
  }
});

// Get session messages
app.get('/session/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const sessionService = new SessionService(c.env);
    
    const session = await sessionService.getSession(sessionId);
    
    if (!session) {
      return c.json<ErrorResponse>({
        error: 'Not Found',
        message: 'Session not found',
        code: 'SESSION_NOT_FOUND'
      }, 404);
    }

    return c.json(session);
  } catch (error) {
    console.error('Error getting session:', error);
    return c.json<ErrorResponse>({
      error: 'Internal Server Error',
      message: 'Failed to retrieve session',
      code: 'INTERNAL_ERROR'
    }, 500);
  }
});

// Clear session
app.delete('/session/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const sessionService = new SessionService(c.env);
    
    await sessionService.clearSession(sessionId);
    
    return c.json({
      success: true,
      message: 'Session cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing session:', error);
    return c.json<ErrorResponse>({
      error: 'Internal Server Error',
      message: 'Failed to clear session',
      code: 'INTERNAL_ERROR'
    }, 500);
  }
});

// Session info endpoint
app.get('/session/:sessionId/info', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const sessionService = new SessionService(c.env);
    
    const session = await sessionService.getSession(sessionId);
    
    if (!session) {
      return c.json<ErrorResponse>({
        error: 'Not Found',
        message: 'Session not found',
        code: 'SESSION_NOT_FOUND'
      }, 404);
    }

    return c.json({
      id: session.id,
      messageCount: session.messages.length,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity,
      ttl: c.env.SESSION_TTL
    });
  } catch (error) {
    console.error('Error getting session info:', error);
    return c.json<ErrorResponse>({
      error: 'Internal Server Error',
      message: 'Failed to retrieve session info',
      code: 'INTERNAL_ERROR'
    }, 500);
  }
});

// Error handling
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  
  return c.json<ErrorResponse>({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    code: 'UNHANDLED_ERROR'
  }, 500);
});

app.notFound((c) => {
  return c.json<ErrorResponse>({
    error: 'Not Found',
    message: 'Endpoint not found',
    code: 'ENDPOINT_NOT_FOUND'
  }, 404);
});

export default app;