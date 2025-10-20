# 🪶 OracleSage — AI-Powered Scripture Based Q&A (cf_ai_oraclesage)

**OracleSage** is an AI application built on **Cloudflare Workers AI** that answers questions about the Bible.  
You can ask questions like:

> ✦ Who was the mother of Moses?  
> ✦ What does “Talitha cumi” mean?  
> ✦ Who else did Jesus raise from the dead?

The AI responds conversationally and, when possible, provides relevant verse references or contextual explanations.

---

## 🌟 Features

- ⚡ **LLM-Powered Knowledge** — Uses [Llama 3.3 on Workers AI](https://developers.cloudflare.com/workers-ai/models/) to interpret and answer biblical questions.  
- 🧠 **Conversational Memory** — Session-based memory using **Durable Objects** or **KV Storage**, so follow-up questions maintain context.  
- 💬 **Interactive Chat UI** — Simple chat interface built on **Cloudflare Pages** (React).  
- 📖 **Verse Awareness** — Integrates with the [Bible API](https://bible-api.com/) for verse lookups and references.  
- 🌍 **Edge-Native Performance** — Entirely powered by Cloudflare’s global edge network.

---
<!--
## 🧱 Architecture Overview

```

cf_ai_oraclesage/
├── frontend/                # Chat UI (React on Cloudflare Pages)
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── package.json
│
├── worker/                  # Cloudflare Worker (Backend)
│   ├── index.ts             # Main entry (handles /ask endpoint)
│   ├── ai.ts                # Llama 3.3 query handler
│   ├── memory.ts            # Durable Object or KV for chat state
│   ├── bible.ts             # Optional Bible API integration
│   └── wrangler.toml        # Worker configuration
│
├── PROMPTS.md               # AI prompts used during development
└── README.md

````

---

## ⚙️ Setup & Development

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/cf_ai_oraclesage.git
cd cf_ai_oraclesage
````

### 2. Install dependencies

Each folder has its own `package.json`:

```bash
cd frontend && npm install
cd ../worker && npm install
```

### 3. Configure Wrangler

Create a `wrangler.toml` in the `worker/` directory:

```toml
name = "cf_ai_oraclesage"
main = "index.ts"
compatibility_date = "2025-10-20"

[ai]
binding = "AI"

[[kv_namespaces]]
binding = "CHAT_MEMORY"
id = "your_kv_id"

[[durable_objects.bindings]]
name = "ChatSession"
class_name = "ChatSession"

[vars]
BIBLE_API_URL = "https://bible-api.com"
```

### 4. Run locally

Start the worker:

```bash
npx wrangler dev
```

Run the frontend:

```bash
cd frontend
npm run dev
```

Access the app at **[http://localhost:8787](http://localhost:8787)**

---
-->

## 🧠 Example Usage

**User:** What does "Talitha cumi" mean?
**OracleSage:** “Talitha cumi” is an Aramaic phrase found in *Mark 5:41*, where Jesus said, “Little girl, arise.”

**User:** Who were her parents?
**OracleSage:** The passage doesn’t mention the girl’s parents by name, only that she was the daughter of a synagogue ruler named Jairus.

---

## 🪄 Deployment

### Deploy Worker

```bash
npx wrangler deploy
```

### Deploy Frontend

* Push your frontend to a GitHub repo.
* Connect it to **Cloudflare Pages** → `cf_ai_oraclesage.pages.dev`.

---
<!--
## 📄 PROMPTS.md

Document your prompts and ChatGPT/LLM interactions during development:

```
Prompt: "Generate a Cloudflare Workers-based AI project that answers questions about the Bible using Llama 3.3"
Response: (include key instructions or snippets)
```

---
-->

## 🧰 Tech Stack

| Component  | Tech                               |
| ---------- | ---------------------------------- |
| LLM        | Llama 3.3 (Workers AI)             |
| Backend    | Cloudflare Workers                 |
| State      | Durable Objects / KV               |
| Frontend   | React (Pages)                      |
| Deployment | Cloudflare Pages                   |
| Verse API  | [Bible API](https://bible-api.com) |

---

## 🛡️ License

MIT License © 2025 Precious Olusola

---

## 💬 Author

**Precious Olusola**
[GitHub: codepraycode](https://github.com/codepraycode)
[Email: [preciousbusiness10@gmail.com](mailto:preciousbusiness10@gmail.com)]
