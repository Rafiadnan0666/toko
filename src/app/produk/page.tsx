'use client';

import { useEffect, useState } from 'react';

interface Produk {
  _id: number;
  nama_produk: string;
  harga: number;
  stok: number;
}

export default function ProdukPage() {
  const [data, setData] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nama_produk: '', harga: '', stok: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/produk');
      if (!res.ok) throw new Error('Failed to fetch');
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ nama_produk: '', harga: '', stok: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await fetch('/api/produk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editingId, ...form, harga: Number(form.harga), stok: Number(form.stok) }),
      });
      setEditingId(null);
    } else {
      await fetch('/api/produk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, harga: Number(form.harga), stok: Number(form.stok) }),
      });
    }
    setForm({ nama_produk: '', harga: '', stok: '' });
    fetchData();
  };

  const handleEdit = (item: Produk) => {
    setForm({ nama_produk: item.nama_produk, harga: item.harga.toString(), stok: item.stok.toString() });
    setEditingId(item._id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus?')) {
      await fetch(`/api/produk?_id=${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  if (loading) return <div className="p-8 text-center font-bold text-xl">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-bold text-xl">{error}</div>;

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-6xl font-black mb-8">Data Produk</h1>
        <button onClick={fetchData} className="neo-btn neo-btn-green mb-4 text-lg">Refresh Data</button>
        <form onSubmit={handleSubmit} className="neo-card p-6 mb-8 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nama Produk" value={form.nama_produk} onChange={(e) => setForm({ ...form, nama_produk: e.target.value })} className="neo-input" required />
            <input type="number" placeholder="Harga" value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} className="neo-input" required />
            <input type="number" placeholder="Stok" value={form.stok} onChange={(e) => setForm({ ...form, stok: e.target.value })} className="neo-input col-span-2" required />
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
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.nama_produk}</td>
                  <td>Rp {item.harga.toLocaleString()}</td>
                  <td>{item.stok}</td>
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
