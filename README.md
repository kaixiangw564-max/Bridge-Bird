# Bridge Bird

**From confusing messages to clear next steps.**

Bridge Bird is an AI-powered campus action navigator designed for international students, first-generation college students, English learners, and anyone navigating college systems for the first time.

It converts confusing school emails and notices into verified, structured action plans.

---

## Social problem

College communication is fragmented, full of jargon, and assumes students already understand hidden institutional rules. Students who are new to the system — whether because of language barriers, being the first in their family to attend college, or navigating unfamiliar bureaucracy — often miss deadlines, contact the wrong office, or ignore important messages they do not fully understand.

Bridge Bird bridges that gap.

---

## What makes Bridge Bird different

**ChatGPT gives students an answer. Bridge Bird gives students a verified path forward.**

| Generic chatbot | Bridge Bird |
|---|---|
| Gives generic advice | Matches you to the correct campus office |
| May hallucinate office names | Uses verified campus resource data |
| Does not extract deadlines | Extracts and formats deadlines with countdowns |
| No structured action plan | Provides BirdPath: step-by-step personalized actions |
| No document checklist | Generates a checklist of required documents |
| No email drafting | Generates editable, ready-to-send emails |
| No calendar integration | Downloads .ics calendar files |
| No trust indicators | BirdTrust separates AI interpretation from official data |
| No department reasoning | BirdCheck explains why a department is or is not the right match |

---

## Main features

- **Message analysis** — Paste a school email and get a plain-language explanation, urgency level, deadline, and action plan
- **BirdPath** — A personalized step-by-step action timeline
- **BirdCheck** — Department matching that recommends and explains the correct campus office
- **BirdTrust** — Clear separation between AI-generated guidance and verified campus resource data
- **Resource directory** — Searchable directory of verified campus resources with topics, documents, and links
- **Email generator** — Editable, ready-to-send email drafts
- **Calendar export** — Download deadlines as .ics calendar events
- **Multilingual** — Analysis results available in English, Chinese, and Spanish

---

## Technology stack

- **Next.js 15** with App Router
- **TypeScript** (strict mode)
- **React 19**
- **CSS** (custom properties, no component library)
- **OpenAI API** (optional, with mock fallback)
- **Vercel** (deployment-ready)

No external UI libraries, icon packages, or component libraries are used. All icons are inline SVG.

---

## Local setup

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | No | OpenAI API key for LLM-powered analysis. Without it, Bridge Bird uses deterministic keyword matching. |
| `OPENAI_MODEL` | No | OpenAI model to use (defaults to `gpt-4o-mini`). |

---

## Mock mode

Bridge Bird works fully without an API key. When no `OPENAI_API_KEY` is configured, the API route uses a deterministic local analyzer that recognizes:

- Residency documentation
- Financial aid
- International student / F-1 status
- Registration holds
- Academic probation
- Food and housing support

The local analyzer uses keyword matching and returns structured results including translated text for English, Chinese, and Spanish.

---

## Deployment

This project is designed for Vercel deployment:

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Optionally add `OPENAI_API_KEY` and `OPENAI_MODEL` as environment variables.
4. Deploy.

No database, authentication, or infrastructure configuration is required.

---

## Hackathon demo flow

1. **Open the landing page** — See the hero, features, and trust messaging.
2. **Click "Try an Example"** — Auto-loads a sample residency documentation email.
3. **Click "Analyze Message"** — Sends the message to the API and navigates to results.
4. **Review the plain-language explanation** — See AI interpretation in clear language.
5. **Review BirdPath** — See the personalized 5-step action timeline.
6. **Review BirdCheck** — See department matching with reasoning.
7. **Review BirdTrust** — See confidence, verification status, and separation of AI vs. official data.
8. **Generate and copy the email** — Edit and copy a ready-to-send email draft.
9. **Download the calendar event** — Get a .ics file for the deadline.
10. **Open the official resource** — Navigate to the verified campus department page.

---

## Limitations

- **Pilot data only** — Resources are currently configured for Diablo Valley College as a pilot campus.
- **No legal or immigration advice** — Bridge Bird provides informational guidance only. Students must confirm critical deadlines and legal status with official offices.
- **Keyword fallback** — The mock mode uses simple keyword matching and has limited category coverage.
- **File upload is not implemented** — The UI includes a visual placeholder but no real file parsing.
- **No user accounts** — This is a demo; results are stored in sessionStorage and lost on browser close.

---

## Future improvements

- Support for additional campuses with configurable resource data
- Live syncing with official campus resource directories
- Secure document upload with OCR for printed notices
- School portal integrations (Canvas, student information systems)
- Personalized deadline reminder notifications
- Human counselor escalation workflow
- Expanded accessibility support
- Voice input for messages
- More language support
