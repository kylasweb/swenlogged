import React, { useState, useCallback } from 'react';
import { Switch } from '@/components/ui/switch';
import { puterService } from '@/utils/puterService';
import { useAIStreamingChat } from '@/hooks/useAIStreamingChat';

/**
 * AIChatConsole
 * Visible streaming chat component with testMode/auth popup toggle.
 */
export const AIChatConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [testMode, setTestMode] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful logistics assistant. Keep answers concise.');

  const chat = useAIStreamingChat({
    initialMessages: [{ role: 'system', content: systemPrompt }],
    testMode
  });

  // Sync system message if changed
  const applySystemPrompt = useCallback(() => {
    chat.setMessages([{ role: 'system', content: systemPrompt }]);
  }, [systemPrompt, chat]);

  const send = async () => {
    if (!input.trim() || chat.isStreaming) return;
    chat.appendUser(input.trim());
    setInput('');
    await chat.run();
  };

  return (
    <div className="border rounded-md p-4 space-y-3 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Test Mode</span>
          <Switch checked={testMode} onCheckedChange={(v)=>setTestMode(!!v)} />
          <span className="text-xs text-muted-foreground">{testMode ? 'No auth prompt / sandbox' : 'May trigger Puter auth popup'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
          <input
            value={systemPrompt}
            onChange={e=>setSystemPrompt(e.target.value)}
            className="flex-1 border rounded px-2 py-1 text-xs"
            placeholder="System prompt"
          />
          <button onClick={applySystemPrompt} className="text-xs border rounded px-2 py-1">Apply</button>
        </div>
      </div>
      <div className="h-56 overflow-auto border rounded p-2 bg-neutral-50 text-sm font-mono">
        {chat.messages.map((m,i)=> (
          <div key={i} className={m.role === 'user' ? 'text-blue-700' : m.role === 'assistant' ? 'text-green-700' : 'text-slate-600'}>
            <strong>{m.role}:</strong> {String(m.content)}
          </div>
        ))}
        {chat.isStreaming && chat.streamText && (
          <div className="text-green-700"><strong>assistant (streaming):</strong> {chat.streamText}</div>
        )}
      </div>
      <div className="flex gap-2 items-start">
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter') send(); }}
          placeholder="Ask a question..."
          className="flex-1 border rounded px-3 py-2 text-sm"
          disabled={chat.isStreaming}
        />
        <button
          onClick={send}
          disabled={chat.isStreaming || !input.trim()}
          className="px-3 py-2 text-sm border rounded bg-primary text-primary-foreground disabled:opacity-50"
        >{chat.isStreaming ? '...' : 'Send'}</button>
        {chat.isStreaming && (
          <button onClick={chat.abort} className="px-3 py-2 text-sm border rounded text-red-600">Stop</button>
        )}
        <button onClick={()=>{ chat.reset(); applySystemPrompt(); }} className="px-3 py-2 text-sm border rounded">Reset</button>
      </div>
      {chat.error && <div className="text-xs text-red-600">{chat.error}</div>}
      <div className="text-[11px] text-muted-foreground">Model: gpt-5-nano (default) • Streaming demo</div>
    </div>
  );
};

export default AIChatConsole;
