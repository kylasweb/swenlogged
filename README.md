# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d303b461-8e17-4bc1-b9d3-5189bafd8335

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d303b461-8e17-4bc1-b9d3-5189bafd8335) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## AI-Powered Logistics Suite

Many tools in this application are AI‑augmented using Puter.js (client-side LLM access) with a consistent toggle + caching pattern. Each upgraded tool preserves a deterministic fallback path when AI Mode is disabled.

### Current AI-Enhanced Tools

Route Optimizer, Freight Quote, Document Scanner (OCR post‑processing), Container Load Optimizer, Marine Traffic Analysis, Demand Forecasting, Logistics Risk Assessment, Customs Duty Estimator, Transit Time Estimator, Price Prediction Engine, Packaging Advisor, Insurance Coverage Calculator, Port Performance Dashboard, Supply Chain Risk Assessment (supplier-level), and Compliance Checker.

### Key Building Blocks

- `puterService.ts`: Lazy loads Puter.js, readiness checking, safe fallback responses.
- `toolPrompts.ts`: Central library of strongly structured JSON-only prompt builders.
- `useAICachedAction.ts`: Executes a prompt once per unique cache key (LocalStorage) and returns parsed JSON text.
- `extractJson` (in AI parsing utilities): Robust JSON extraction from imperfect model output.
- `AIBadge` + Switch: Visual indicator & user control for AI mode per tool.

### Adding a New AI Tool (Quick Recipe)

1. Define domain shape your component needs (TypeScript interface).
2. Add a prompt builder in `toolPrompts.ts` insisting on JSON schema (no markdown, no prose).
3. In the component:
   - Add `aiEnabled` state + toggle (Switch) + `AIBadge`.
   - Use `useAICachedAction(() => promptBuilder(params), [deps], { cacheKey })`.
   - On run: if `aiEnabled`, await AI result, map to internal types with validation & fallbacks.
   - If AI fails or returns partial, gracefully fall back to legacy/manual logic.
4. Guard all array iterations with `(array || [])` to prevent runtime `undefined.map` errors.
5. Keep cache key deterministic and specific (include meaningful inputs joined by colons).

### Error Handling & Safety

- All prompts enforce JSON-only output; parser trims any stray text.
- Type narrowing ensures unknown AI fields never crash UI.
- Fallback manual path ensures feature parity when AI unreachable.

### Troubleshooting

| Symptom                            | Likely Cause                | Fix                                            |
| ---------------------------------- | --------------------------- | ---------------------------------------------- |
| "Puter.js AI service is not ready" | Script not yet loaded       | Wait a moment or check network blockers        |
| Empty AI section                   | Model returned invalid JSON | Check console; ensure prompt schema maintained |
| Stale results                      | Cached response reused      | Toggle inputs or clear LocalStorage key        |
| Type errors after prompt change    | Interfaces out of sync      | Update TS interfaces + mapping logic           |

### Clearing AI Cache

Open DevTools > Application > Local Storage and remove keys prefixed with the tool namespace (e.g. `supplier-risk:` or `compliance:`).

### Extending Prompts

Prompts should: (1) declare exact JSON schema, (2) forbid markdown fences, (3) give minimal contextual lane/supplier/product info, (4) keep arrays concise.

### Streaming & Conversational Chat

Real-time AI output and multi-turn context are supported via:

- `puterService.makeAIChat({ messages, options, onChunk })` – low-level helper that accepts an array of message objects (`{ role: 'system'|'user'|'assistant', content: string }`). If the underlying Puter API returns an async iterable, chunks are streamed through `onChunk`.
- `useAIStreamingChat` – React hook that wraps message state, incremental streaming text, abort, and reset logic.

Minimal usage example (component sketch):

```tsx
import { useAIStreamingChat } from "@/hooks/useAIStreamingChat";

export function AIChatConsole() {
  const chat = useAIStreamingChat();
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;
    chat.appendUser(input.trim());
    setInput("");
    await chat.run(); // streams into chat.streamingText
  };

  return (
    <div className="space-y-3">
      <div className="h-48 overflow-auto border rounded p-2 text-sm font-mono bg-black/5">
        {chat.messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-blue-700" : "text-slate-800"}
          >
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
        {chat.streamingText && (
          <div className="text-green-700">
            <strong>assistant (streaming):</strong> {chat.streamingText}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Ask something…"
        />
        <button
          onClick={send}
          disabled={chat.loading}
          className="px-3 py-1 border rounded"
        >
          {chat.loading ? "..." : "Send"}
        </button>
        {chat.loading && (
          <button
            onClick={chat.abort}
            className="px-3 py-1 border rounded text-red-600"
          >
            Stop
          </button>
        )}
      </div>
      {chat.error && (
        <div className="text-red-600 text-sm">{String(chat.error)}</div>
      )}
    </div>
  );
}
```

Key hook fields:

- `messages`: full conversation so far.
- `streamingText`: partial assistant reply being built chunk by chunk.
- `appendUser(text)`: add a user message prior to `run()`.
- `run()`: triggers streaming assistant response.
- `abort()`: cancels an in-flight stream (if supported by provider).
- `reset()`: clears all state.

Integration Hints:

- Keep a system message first to enforce persona / output contract.
- For JSON-required answers, treat streaming as progressive preview; finalize by parsing on `run()` resolve.
- Debounce UI reflows if rendering very large streamed outputs.
- Provide a manual copy button once the final answer settles for user convenience.

## Local Development (Recap)

Run the dev server:

```sh
npm run dev
```

Type-check & build:

```sh
npm run lint
npm run build
```

Run tests (if present):

```sh
npm test
```

## Contributing AI Enhancements

1. Open a feature branch.
2. Add / adjust prompt & component mapping.
3. Verify `npm run lint && npx tsc --noEmit` passes.
4. Open PR describing new schema contract.

## License & Notes

This repository originated from a Lovable-generated scaffold; AI layers and logistics domain tooling were added afterward. Ensure no sensitive data is fed into prompts—current design is browser-side.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d303b461-8e17-4bc1-b9d3-5189bafd8335) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
