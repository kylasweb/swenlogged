AI response parser

This project uses a centralized parser `src/utils/aiResponseParser.ts` to safely extract human-readable text from AI responses returned by Puter.js (and OpenAI-like wrappers). The parser is defensive and designed to handle multiple shapes:

- Plain string responses
- OpenAI-like `choices[0].message.content` (string or array of parts)
- Puter.js `message.content` streaming parts (array of { type, text })
- Top-level `text` or `content` fields

Why centralize?

- AI responses vary in runtime shape. Calling `.map()` on an unvalidated `message.content` caused runtime TypeErrors.
- Centralizing parsing reduces duplication and ensures uniform fallbacks and logging.

Debugging tips

- LiveChat logs the full AI response to the console as `Full AI response:`. Copy that object when you see unexpected output and include it in bug reports.
- If you see `Cannot read properties of undefined (reading 'map')`, ensure the response shape is as expected or update the parser to accept the new shape.

Tests

- Unit tests live in `src/utils/aiResponseParser.test.ts` and run with `npm test` (Vitest).

Extending the parser

- Add handling for new fields in `extractTextFromPuterResponse`.
- Add tests for the new shape to `src/utils/aiResponseParser.test.ts`.
