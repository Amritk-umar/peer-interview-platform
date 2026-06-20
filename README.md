# PeerPrep: Elite Peer Interview Platform

PeerPrep is a high-fidelity, collaborative technical interview platform designed for modern engineers. It provides a production-grade environment for mock interviews, featuring real-time code synchronization, AI-driven complexity analysis, and an immersive "Sci-Fi Command Center" aesthetic.

## 🚀 Project Overview

- **Purpose**: To provide a seamless, high-performance environment for technical interview practice.
- **Architecture**: Next.js 16 App Router with a heavy emphasis on real-time interactivity.
- **Key Features**:
  - **Multiplayer Editor**: Real-time code sync powered by Supabase.
  - **AI Intel**: On-demand code review and complexity analysis via Google Gemini 1.5 Flash.
  - **Sci-Fi UI**: Immersive dark-theme design with grain textures, perspective grids, and scanning effects.
  - **Identity Management**: Secure authentication and session tracking via Clerk.

## 🛠️ Technology Stack

- **Framework**: Next.js 16.2.9 (React 19)
- **Styling**: Tailwind CSS 4
- **Real-time/DB**: Supabase (@supabase/supabase-js)
- **Auth**: Clerk (@clerk/nextjs)
- **Editor**: Monaco Editor (@monaco-editor/react)
- **AI**: AI SDK + Google Gemini
- **Icons**: Lucide React

### 🔑 Environment Variables

To run this project locally, create a `.env.local` file in the root directory and add the following keys. You will need accounts with Clerk, Supabase, Google AI Studio, and Upstash.

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (Real-time DB)
NEXT_PUBLIC_SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=AIza...

# Upstash Redis (Caching)
UPSTASH_REDIS_REST_URL=[https://your-database.upstash.io](https://your-database.upstash.io)
UPSTASH_REDIS_REST_TOKEN=AYZ...

### 2. Database Setup Instructions
Since you are using Supabase's `postgres_changes` listener for real-time code and chat sync, developers need to know what tables to create.

**Add a brief schema section:**

```markdown
### 🗄️ Database Setup (Supabase)

This project relies on Supabase for real-time synchronization. You must create the following tables and enable Realtime broadcasts for them:

1. **`sessions`**: Stores active interview rooms (`id`, `host_id`, `prompt`, `created_at`).
2. **`messages`**: Stores room chat history (`id`, `session_id`, `user_id`, `content`, `created_at`).

*Note: Ensure Row Level Security (RLS) is configured appropriately for your environments.*

## 📦 Building and Running

### Development
```bash
npm run dev
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production
```bash
npm run build
npm run start
```
Builds the application for production and starts the server.

### Linting
```bash
npm run lint
```
Runs ESLint to check for code quality issues.

## 🎨 Development Conventions

### 1. "Elite Sci-Fi" Design System
- **Backgrounds**: Deep black (`#020202`) with animated perspective grids, scanlines, and high-density grain overlays.
- **Typography**: Ultra-bold headlines (`font-black`), tight tracking (`tracking-tight` or `tracking-[-0.06em]`), and uppercase monospace labels.
- **Colors**: High-contrast white/slate-400 text with neon accents (`blue-500`, `purple-500`, `green-500`).
- **Interactivity**: Use shimmer effects, pulsing glows, and smooth transitions to signal premium quality.

### 2. Client & Server Components
- Components requiring `usePathname`, `useState`, or custom animations (via `styled-jsx` or Framer Motion) **must** be marked with `"use client";`.
- The Landing Page and Room interfaces are primarily Client Components due to complex visual effects and real-time state.

### 3. Real-time Synchronization
- Code and Chat sync are handled via Supabase's `postgres_changes` listener.
- Always implement a debounce (e.g., 400ms) on database updates to prevent API rate limiting during rapid typing.

### 4. Code Standards
- **TypeScript**: Strict typing is preferred. Use explicit interfaces for data models (e.g., `Session`, `Message`).
- **Icons**: Always use `lucide-react` for consistency.
- **Validation**: Ensure all interactive elements have loading/loading states and clear feedback (e.g., "Invite link copied").

## 📈 Recent Scalability & Architecture Improvements
- **Performance & Infrastructure**:
  - Implemented Redis caching (`ioredis`) for chat messages in `/api/messages`.
  - Added structured logging (`pino`) for API monitoring and observability.
  - Optimized database query patterns by identifying need for indexes on `messages(session_id, created_at)` and `sessions(host_id, created_at)`.
- **Architectural Decoupling**:
  - Extracted code execution logic from `app/api/execute` into a dedicated service layer (`lib/judge0-service.ts`) to improve modularity and maintainability.

### 🚀 Deployment

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Add all the environment variables from your `.env.local` file into the Vercel project settings.
4. Click **Deploy**. Vercel will automatically handle Next.js static generation and edge network distribution.

---
