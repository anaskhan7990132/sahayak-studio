# Sahayak Studio

A multilingual voice-agent builder with **Write → Refine → Test → Deploy → Observe**. The showcase provides rural-welfare and consumer-complaint guidance in Hindi, Bhojpuri, and English.

## Quick start

Requirements: Node.js 22.13+ (Node 24 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a reproducible install using the included lockfile:

```bash
corepack pnpm install --frozen-lockfile
npm run dev
```

## Configure AI and voice providers

Copy `.env.example` to `.env.local`, add your own credentials, and restart the app. You can also configure settings inside the app.

- `ELEVENLABS_API_KEY` — agent provisioning, voice library, transcription, text-to-speech, and signed conversation URLs.
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` — optional existing agent ID.
- `GEMINI_API_KEY` — open-ended compilation, refinement, and chat.
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — optional server-side storage; read `docs/DATABASE.md` first.

Some demo features work without API keys. Provider calls require valid permissions and sufficient credits. **Never commit `.env.local` or API keys.**

## Features

- Starter templates and validated AgentConfig generation.
- Refinement chat and editable conversation stages and conditions.
- Voice library, previews, delivery settings, and live-agent integration.
- PDF, TXT, and Markdown reference uploads.
- Synthetic callers, response timings, and heuristic safety checks.
- Complaint draft exports, local call history, transcripts, summaries, and charts.
- Website widget, portable conversation links, and a citizen-facing `/talk/[agentId]` view.
- Optional Supabase adapter and browser autosave.

## Verification

```bash
npm run typecheck
npm test
npm run build
```

## Important limitations

This is a functional demo, not an audited production service. Live provider calls have not been verified with your credentials. Safety results are heuristic; complaint PDFs are unsigned drafts and are not submitted to government services. Eligibility guidance is preliminary, not an official determination.

Before public deployment, add and test authentication/authorization, quotas, retention and deletion policies, audit logging, and human escalation. Review provider permissions and privacy obligations before using real citizen data.

## Project structure

- `app/` — pages and API handlers
- `components/studio/` — studio interface and citizen UI
- `lib/` — agent compiler, provider integration, API helpers, and types
- `docs/` — database and verification notes
- `tests/` and `scripts/` — behavioral checks
- `public/widget.js` — floating conversation launcher

## References

- https://elevenlabs.io/docs/eleven-agents/libraries/react
- https://elevenlabs.io/docs/api-reference/agents/create
- https://pmkisan.gov.in/Documents/RevisedFAQ.pdf
- https://consumeraffairs.gov.in/pages/nch
