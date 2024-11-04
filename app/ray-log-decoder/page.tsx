'use client';

import { useState } from 'react';
import { RaydiumAmmLogsParser } from '../raydium-amm-logs-parser';

export default function RayLogDecoder() {
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
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Raydium Log Decoder</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="rayLog" className="block text-sm font-medium mb-2">
            Enter ray_log
          </label>
          <textarea
            id="rayLog"
            className="w-full p-2 border rounded-md min-h-[100px] bg-background text-foreground"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your ray_log here..."
          />
        </div>

        <button
          onClick={handleDecode}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Decode
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Decoded Output:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[400px]">
            {decodedOutput ? JSON.stringify(decodedOutput, null, 2) : 'No data'}
          </pre>
        </div>
      </div>
    </div>
  );
} 