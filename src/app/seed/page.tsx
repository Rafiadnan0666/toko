'use client';

import { useState } from 'react';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const seedData = async () => {
    setLoading(true);
    setMessage('');
    try {
      await fetch('/api/seed', { method: 'POST' });
      setMessage('Data berhasil di-seed!');
    } catch {
      setMessage('Gagal seed data');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-8" style={{textShadow: '3px 3px 0px #000'}}>Seed Data Toko Online</h1>
        <button
          onClick={seedData}
          disabled={loading}
          className="neo-btn neo-btn-green text-lg px-8 py-3 disabled:opacity-50"
        >
          {loading ? 'Seeding...' : 'Seed Data'}
        </button>
        {message && <p className="mt-4 text-lg font-bold">{message}</p>}
      </div>
    </div>
  );
}
