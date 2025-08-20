import Link from 'next/link';
import { apiFetch } from '../../lib/api';

// @ts-ignore
export default async function Dashboard(): Promise<any> {
  // @ts-ignore
  const res = await apiFetch('/api/drills').catch(() => ({ data: [] }));
  const drills: any[] = res.data || [];
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
