# AI Debate Arena

An interactive multi-agent AI debate platform where autonomous LLM agents engage in structured debates, challenge each other’s reasoning, and dynamically generate arguments in real time.

Built as a full-stack NLP + AI engineering project using FastAPI, Next.js, React animations, and Groq-powered LLM inference.

---

## Live Demo

🚀 https://ai-debate-arena-one.vercel.app/

---

## Project Overview

AI Debate Arena simulates a formal debate between multiple AI agents with permanently assigned stances.

The system accepts a debate topic from the user and launches:

- a **PRO agent** supporting the topic
- an **OPPOSITION agent** countering the topic
- a **Moderator agent** evaluating the overall debate

Each agent maintains contextual memory across rounds while preserving role consistency and logical coherence.

The project was designed not just as a chatbot interface, but as an exploration into:

- multi-agent LLM systems
- debate reasoning
- prompt engineering
- semantic moderation
- stance consistency enforcement
- conversational memory drift

---

# Core Features

## Multi-Agent Debate Simulation

Two autonomous AI agents debate a topic over multiple rounds.

Each response is context-aware and references previous arguments dynamically.

---

## Role Consistency Enforcement

One of the major engineering problems solved in this project was:

### Agent Drift

LLMs naturally tend to switch stances during recursive conversations.

Example:
- PRO side accidentally agreeing with OPP
- agents losing debate identity
- contextual contamination over long histories

To solve this, the system introduces:

- persistent role anchoring
- stance-lock prompting
- debate identity reinforcement

This ensures:
- PRO always supports
- OPP always opposes
- arguments remain logically consistent

---

## Semantic Topic Moderation

Before a debate begins, topics pass through an AI moderation pipeline.

The system classifies prompts into:

- VALID
- MEANINGLESS
- INAPPROPRIATE
- UNSAFE

This prevents:
- nonsense prompts
- harmful requests
- explicit content
- unsafe topics

while still allowing academic discussion of sensitive subjects.

---

## Interactive Animated Frontend

The frontend was built with a strong focus on visual interaction and recruiter appeal.

Features include:

- animated particle background
- motion-enhanced UI
- glowing gradient effects
- dynamic hover interactions
- animated debate cards
- responsive modern layout
- interactive topic suggestion pills

The goal was to create something that feels closer to a modern AI product rather than a basic CRUD application.

---

## Moderator Decision Engine

After debate rounds conclude, a moderator agent evaluates:

- argument strength
- logical consistency
- rebuttal quality
- persuasion effectiveness

and determines the winner with reasoning.

---

# Tech Stack

## Frontend
- Next.js
- React
- Framer Motion
- Custom Canvas Particle System
- CSS Animations

## Backend
- FastAPI
- Python
- LangChain
- Groq API Integration

## AI / NLP Concepts
- Prompt Engineering
- Multi-Agent Systems
- LLM Role Anchoring
- Semantic Moderation
- Conversational Context Management
- Debate Memory Handling

---

# System Architecture

User Input  
↓  
Topic Validation  
↓  
Semantic Moderation Layer  
↓  
PRO Agent Generation  
↓  
OPPOSITION Agent Generation  
↓  
Contextual Debate Memory Update  
↓  
Moderator Evaluation  
↓  
Frontend Rendering

---

# Interesting Engineering Challenges

## 1. Role Instability

Agents initially switched sides during later rounds.

This was solved using:
- stronger identity prompts
- permanent stance reinforcement
- anti-agreement constraints

---

## 2. Context Overflow

Long debate histories caused:
- repetitive arguments
- hallucinations
- topic drift

To reduce this:
- debate history trimming was introduced
- contextual memory windows were limited

---

## 3. Frontend Performance

Interactive particle systems initially caused lag and clutter.

The animation system was optimized by:
- reducing particle density
- improving rendering logic
- balancing motion with UI readability

---

# Future Improvements

- Voice-based debates
- Real-time streaming responses
- Debate scoring metrics
- User vs AI debate mode
- Persistent debate history database
- Authentication system
- Multiplayer debate rooms
- AI personality customization
- Vector memory retrieval
- RAG-powered evidence injection

---



---

# Installation

## Clone Repository

```bash
git clone https://github.com/nayana9o999/ai-debate-arena.git
```

---

## Backend Setup

```bash
cd backend/app

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_api_key_here
```

---

# Author

Nayana

Built as a full-stack AI/NLP engineering project exploring autonomous debate systems and interactive AI interfaces.
