"use client";

import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function History() {
  console.log("History component function body — render start");
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('History useEffect mount - fetching attempts');
    let mounted = true;
    apiFetch('/api/attempts?limit=25')
      .then((res) => {
        console.log('History fetch response', res);
        if (!mounted) return;
        setAttempts(res.data || []);
      })
      .catch((err) => {
        console.log('History fetch error', err);
        if (!mounted) return;
        setAttempts([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  console.log('History render attempts count', attempts.length, 'loading:', loading);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Recent Attempts</h1>
      <div className="mb-4">
        <span className="inline-block px-2 py-1 bg-green-600 text-white rounded">Client JS active</span>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : attempts.length === 0 ? (
        <div className="text-gray-600">No attempts found.</div>
      ) : (
        <ul className="space-y-3">
          {attempts.map((a: any) => (
            <li key={a._id} className="p-3 border rounded flex justify-between">
              <div>
                <div className="font-medium">Drill: {String(a.drillId)}</div>
                <div className="text-sm text-gray-600">{new Date(a.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-lg font-semibold">{a.score}%</div>
            </li>
          ))}
        </ul>
      )}
      {/* debug output - visible on page to avoid relying on DevTools */}
      <div className="mt-6 text-sm text-gray-300">
        <h2 className="font-medium mb-2">Debug: raw attempts JSON</h2>
        <pre className="whitespace-pre-wrap break-words max-h-72 overflow-auto text-xs bg-gray-900 p-3 rounded">{JSON.stringify(attempts, null, 2)}</pre>
      </div>
    </div>
  );
}
