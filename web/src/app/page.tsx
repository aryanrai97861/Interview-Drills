import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Interview Drills</h1>
        <p className="mb-6">Practice short, focused drills and track your attempts.</p>
        <div className="flex gap-4 justify-center">
          <a className="px-4 py-2 bg-blue-600 text-white rounded" href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/google`}>Sign in with Google</a>
          <Link href="/dashboard" className="px-4 py-2 border rounded">Explore drills</Link>
        </div>
      </div>
    </div>
  );
}
