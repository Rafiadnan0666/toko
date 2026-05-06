'use client';

import { useEffect, useState } from 'react';

interface Pelanggan {
  _id: number;
  nama_pelanggan: string;
  alamat: string;
  no_telp: string;
}

export default function PelangganPage() {
  const [data, setData] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nama_pelanggan: '', alamat: '', no_telp: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCancel = () => {
    setEditingId(null);
    setForm({ nama_pelanggan: '', alamat: '', no_telp: '' });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/pelanggan');
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to fetch');
      }
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
      console.error('Failed to fetch pelanggan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await fetch('/api/pelanggan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editingId, ...form }),
      });
      setEditingId(null);
    } else {
      await fetch('/api/pelanggan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ nama_pelanggan: '', alamat: '', no_telp: '' });
    fetchData();
  };

  const handleEdit = (item: Pelanggan) => {
    setForm({ nama_pelanggan: item.nama_pelanggan, alamat: item.alamat, no_telp: item.no_telp });
    setEditingId(item._id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus?')) {
      await fetch(`/api/pelanggan?_id=${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  if (loading) return <div className="p-8 text-center font-bold text-xl">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-bold text-xl">{error}<br/>Make sure MongoDB is running on localhost:27017</div>;

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-6xl font-black mb-8" >Data Pelanggan</h1>
        <button onClick={fetchData} className="neo-btn neo-btn-green mb-4 text-lg">Refresh Data</button>
        <form onSubmit={handleSubmit} className="neo-card p-6 mb-8 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nama" value={form.nama_pelanggan} onChange={(e) => setForm({ ...form, nama_pelanggan: e.target.value })} className="neo-input" required />
            <input type="text" placeholder="Alamat" value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} className="neo-input" required />
            <input type="text" placeholder="No Telp" value={form.no_telp} onChange={(e) => setForm({ ...form, no_telp: e.target.value })} className="neo-input col-span-2" required />
          </div>
          <button type="submit" className="neo-btn neo-btn-blue mt-4">
            {editingId ? 'Update' : 'Tambah'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="neo-btn neo-btn-yellow mt-4 ml-2">
              Cancel
            </button>
          )}
        </form>
        <div className="neo-card overflow-x-auto bg-white">
          <table className="w-full neo-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>No Telp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.nama_pelanggan}</td>
                  <td>{item.alamat}</td>
                  <td>{item.no_telp}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} className="neo-btn neo-btn-yellow mr-2 px-3 py-1 text-sm">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="neo-btn neo-btn-red px-3 py-1 text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
