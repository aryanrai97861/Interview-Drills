"use client";

import { apiFetch } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// @ts-ignore
export default function DrillPage({ params }: any) {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [drill, setDrill] = useState<any | null>(null);
  const router = useRouter();

  // client-side fetch
  if (!drill) {
    apiFetch(`/api/drills/${params.id}`).then(r => setDrill(r.data)).catch(() => null);
  }

  if (!drill) return <div className="p-8">Loading...</div>;

  const handleChange = (i: number, v: string) => {
    const copy = [...answers];
    copy[i] = v;
    setAnswers(copy);
  };

  const handleSubmit = async () => {
    try {
      const res = await apiFetch('/api/attempts', { method: 'POST', body: JSON.stringify({ drillId: drill._id, answers }) });
      setScore(res.data.score);
    } catch (err) {
      alert('Submit failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">{drill.title}</h1>
      <div className="space-y-4 mt-4">
        {/* @ts-ignore */}
        {drill.questions.map((q: any, i: number) => (
          <div key={i} className="">
            <div className="font-medium">Q{i + 1}. {q.text}</div>
            <textarea className="w-full border rounded mt-2 p-2" rows={3} value={answers[i] || ''} onChange={e => handleChange(i, e.target.value)} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>Submit</button>
      </div>
      {score !== null && <div className="mt-4">Score: {score}%</div>}
    </div>
  );
}
