'use client';

import Image from "next/image";
import { useState } from 'react';
import { RaydiumAmmLogsParser } from './raydium-amm-logs-parser';

export default function Home() {
  const [input, setInput] = useState('');
  
  const [decodedOutput, setDecodedOutput] = useState<any>(null);
  const parser = new RaydiumAmmLogsParser();

  const handleDecode = () => {
    try {
      const result = parser.parse(input);
      setDecodedOutput(result);
    } catch (error) {
      setDecodedOutput({ error: 'Failed to decode ray_log' });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <div className="container max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Raydium Log Decoder</h1>
          <p className="text-muted-foreground">Decode Raydium AMM logs with ease</p>
        </header>

        {/* Input Section */}
        <div className="space-y-4">
          <label htmlFor="rayLog" className="block text-sm font-medium leading-6">
            <h2 className="text-xl font-semibold">Enter ray_log</h2>
          </label>
          <textarea
            id="rayLog"
            className="w-full p-3 border rounded-lg min-h-[150px] bg-background text-foreground resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your ray_log here..."
          />

          <p className="text-sm text-muted-foreground">For example, <code>AwyZZAIFAAAAAAAAAAAAAAABAAAAAAAAAAyZZAIFAAAAX8/owQrb8wGGVnwzYxMAAO0qLEqzgAAA</code></p>
          
          <button
            onClick={handleDecode}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Decode Log
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Decoded Output</h2>
          <pre className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-[400px] text-sm">
            {decodedOutput ? JSON.stringify(decodedOutput, (_, value) =>
              typeof value === 'bigint' ? value.toString() : value
            , 2) : 'No data'}
          </pre>
        </div>
      </div>
    </main>
  );
}
