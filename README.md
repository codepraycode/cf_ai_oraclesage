# 🪶 OracleSage — AI-Powered Biblical Q&A

**OracleSage** is an AI application built on **Cloudflare's edge stack** that provides scripturally-grounded answers to Bible questions. It combines Workers AI with a modern React frontend for seamless biblical exploration.

**Live Demo**: [https://cf-ai-oraclesage.pages.dev](https://cf-ai-oraclesage.pages.dev)

## ✨ Features

- **🤖 AI-Powered Insights** - Uses Llama 3.3 via Cloudflare Workers AI for accurate biblical responses
- **💬 Conversational Memory** - Maintains context across questions using KV storage
- **📖 Verse References** - Automatically detects and highlights Bible references in responses
- **⚡ Edge Native** - Deployed globally on Cloudflare's edge network for low latency
- **🎨 Modern UI** - Clean, responsive chat interface built with React and TypeScript

## 🚀 Quick Start

Ask questions like:

- "Who was the mother of Moses?"
- "What does 'Talitha cumi' mean?"
- "Who did Jesus raise from the dead?"

## 🏗️ Architecture

```bash

OracleSage/
├── frontend/                 # React + TypeScript (Cloudflare Pages)
│   ├── src/components/      # UI source codes
│   └── vite.config.ts       # Build configuration
└── worker/                  # Cloudflare Worker backend
    ├── src/
    │   ├── index.ts         # Main worker handler
    │   ├── services/        # AI and session services
    │   └── types/           # TypeScript definitions
    └── wrangler.toml        # Worker configuration

```

## 🛠️ Tech Stack

| Component       | Technology                          |
|-----------------|-------------------------------------|
| **AI Model**    | Llama 3.3 (Workers AI)              |
| **Backend**     | Cloudflare Workers + Hono           |
| **Frontend**    | React + TypeScript + Vite           |
| **Storage**     | Cloudflare KV                       |
| **Deployment**  | Cloudflare Pages + Workers          |
| **Styling**     | CSS Modules                         |

## 🔧 Development

### Prerequisites

- Node.js 18+
- Wrangler CLI
- Cloudflare account with Workers AI access

### Local Development

1. **Clone and setup**:

```bash
    git clone https://github.com/yourusername/cf_ai_oraclesage.git
    cd cf_ai_oraclesage
```

2.**Backend setup**:

```bash
cd worker
npm install
npx wrangler dev
```

3. **Frontend setup**:

```bash
cd frontend
npm install
npm run dev
```

### Deployment

**Backend**:

```bash
cd worker
npx wrangler deploy
```

**Frontend**:

```bash
cd frontend
npm run build
npx wrangler pages deploy dist --project-name=oraclesage-frontend
```

## 📚 API

### Ask a Question

```http
POST /ask
Content-Type: application/json

{
  "question": "Who was the mother of Moses?",
  "sessionId": "optional-session-id"
}
```

Response:

```json
{
  "answer": "Moses' mother was Jochebed (Exodus 6:20)...",
  "sessionId": "session-id",
  "timestamp": 1700000000000
}
```

## 🌍 Cloudflare Integration

This project demonstrates several Cloudflare capabilities:

- **Workers AI** for LLM inference at the edge
- **KV** for session state management  
- **Pages** for frontend hosting with automatic deployments
- **Workers** for backend API logic

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

MIT License © 2025 Precious Olusola

## 🙏 Acknowledgments

- Built with [Cloudflare Workers](https://workers.cloudflare.com/)
- AI powered by [Llama 3.3](https://developers.cloudflare.com/workers-ai/models/llama-3.3/)
- UI built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)

---

**Live**: [https://cf-ai-oraclesage.pages.dev](https://cf-ai-oraclesage.pages.dev) | **Source**: [GitHub Repository](https://github.com/yourusername/cf_ai_oraclesage)
