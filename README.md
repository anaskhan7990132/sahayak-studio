# Sahayak Studio

A multilingual voice-agent builder with **Write → Refine → Test → Deploy → Observe**. The Sahayak showcase provides rural-welfare and consumer-complaint guidance in Hindi, Bhojpuri and English.

## Run on your laptop

Install Node.js 22.13+ (Node 24 LTS recommended), extract this ZIP, and open a terminal inside `Sahayak-Studio`:
```bash
npm install
npm run dev
```

Open **http://localhost:3000**. Windows users can also run `start-demo.ps1` from PowerShell.

For reproducible installs with the included lockfile, use `corepack pnpm install --frozen-lockfile` instead of `npm install`.

## Connect live AI and voice

Copy `.env.example` to `.env.local`, enter your keys, then restart. Alternatively, open **Settings** in the app. Session storage is the default; device persistence is optional.

- `ELEVENLABS_API_KEY`: agent provisioning, voice library, transcription, TTS and signed conversation URLs.
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`: optional existing agent; alternatively use Refine → Connect live agent.
- `GEMINI_API_KEY`: open-ended compilation, refinement and chat. Model defaults to `gemini-2.5-flash`.
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`: optional server-side storage; read `docs/DATABASE.md` first.

No keys are needed for template generation, text demos, flow editing, synthetic callers or PDF export. Provider calls require valid permissions and sufficient credits. Never commit `.env.local`.

## Included

- Six starters and structured AgentConfig generation with Zod validation.
- Refinement chat; editable, reorderable conversation stages and conditions.
- Voice library, previews and delivery sliders; Scribe speech-to-text route.
- PDF/TXT/MD reference upload, ElevenLabs knowledge upload and agent sync.
- Essential guardrails and tool switches.
- ElevenLabs React SDK live sessions, browser speech fallback and typed chat.
- Three synthetic four-turn callers, measured response timings and heuristic safety checks.
- Unsigned grievance PDFs and JSON exports.
- Website widget, portable conversation links and accessible `/talk/[agentId]` view.
- Phone simulator and telephony setup export.
- Local call history, filtering, charts, transcripts, summaries and PDF/JSON downloads.
- Browser autosave with in-memory operation when storage fails; optional Supabase adapter.

## Current limits

This is a functional demo implementation, not an audited production service. Live ElevenLabs/Gemini calls and cloud operations have not been verified using your credentials.

- Browser speech/microphone support varies. Bhojpuri is best effort. Browser speech is not an ElevenLabs voice sample.
- The no-key compiler and chat use deterministic templates/rules. Open-ended reasoning needs Gemini.
- Conversation stages/conditions become agent instructions, not a formal state-machine engine.
- Local documents are injected as context; provider documents are attached after agent sync. There is no separate vector database.
- Safety results are heuristic, not a certification. Model output needs use-case evaluation.
- Complaint PDFs are **unsigned drafts, not submitted complaints**. Scheme tools provide preliminary guidance, not verified government eligibility/payment status. Human escalation is a local recommendation, not a connected hand-off.
- The phone experience is a simulator. Real Twilio/SIP telephony needs external setup and testing; no outbound calls are placed.
- There is one active local agent. Export versions before generating a different one.
- Historical sample calls are labelled. New timings measure server response or network RTT, not audio TTFB. Summaries and sentiment are deterministic, not a trained analytics service.
- Share links include agent instructions and sample reference briefs, not uploaded knowledge or API keys. Hosting access rules still apply.
- Before public rollout, add real authorization to provider routes, per-user quotas, retention/deletion policies, audit logging, and tested human/telephony integrations. The standalone Next.js server has no hosted-platform authentication boundary.

## Verify and build
```bash
npm run typecheck
npm test
npm run build
npm start
```

Tests cover configuration, immutable refinement, credential refusal, consent, disabled tools, eligibility wording, redaction, and farmer/consumer scenarios.

## Code map

- `app/`: pages and API handlers.
- `components/studio/`: five-stage studio, settings and citizen UI.
- `lib/agents.ts`: compiler, demo dialogue and sample references.
- `lib/server.ts`: provider integration, validation and fallback.
- `lib/client.ts`: API helper, share links and PDF/JSON exports.
- `lib/types.ts`: TypeScript and Zod schema.
- `tests/` and `scripts/test-core.mjs`: behavioral checks.
- `public/widget.js`: floating conversation launcher.

The original preview uses a Vinext/Cloudflare adapter. This ZIP runs with the standard Next.js CLI. The lockfile retains the starter's platform-support dependencies.

## References

- https://elevenlabs.io/docs/eleven-agents/libraries/react
- https://elevenlabs.io/docs/api-reference/agents/create
- https://pmkisan.gov.in/Documents/RevisedFAQ.pdf
- https://consumeraffairs.gov.in/pages/nch

Built-in documents are short source-linked guidance briefs, not official 2026 publications or legal advice.
