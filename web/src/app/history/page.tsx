import { apiFetch } from '../../lib/api';

export default async function History() {
  const res = await apiFetch('/api/attempts?limit=5').catch(() => ({ data: [] }));
  const attempts = res.data || [];
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Recent Attempts</h1>
      <ul className="space-y-3">
        {/* @ts-ignore */}
        {attempts.map((a: any) => (
          <li key={a._id} className="p-3 border rounded flex justify-between">
            <div>
              <div className="font-medium">Drill: {a.drillId}</div>
              <div className="text-sm text-gray-600">{new Date(a.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-lg font-semibold">{a.score}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
