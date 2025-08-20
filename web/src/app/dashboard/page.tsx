"use client";

import Link from 'next/link';
import { apiFetch } from '../../lib/api';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [drills, setDrills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/drills')
      .then(res => setDrills(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Drills</h1>
      <ul className="space-y-3">
        {drills.map(d => (
          <li key={d._id} className="p-4 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{d.title}</div>
                <div className="text-sm text-gray-600">{d.tags?.join(', ')} • {d.difficulty}</div>
              </div>
              <div>
                <Link
                  href={`/drill/${d._id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded">Open</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
