'use client';

import { useEffect, useState } from 'react';

interface Penjualan {
  _id: number;
  id_pelanggan: number;
  id_produk: number;
  jumlah_beli: number;
  total_harga: number;
}

export default function PenjualanPage() {
  const [data, setData] = useState<Penjualan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ id_pelanggan: '', id_produk: '', jumlah_beli: '', total_harga: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/penjualan');
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
    setForm({ id_pelanggan: '', id_produk: '', jumlah_beli: '', total_harga: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await fetch('/api/penjualan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          _id: editingId, 
          ...form, 
          id_pelanggan: Number(form.id_pelanggan), 
          id_produk: Number(form.id_produk), 
          jumlah_beli: Number(form.jumlah_beli), 
          total_harga: Number(form.total_harga) 
        }),
      });
      setEditingId(null);
    } else {
      await fetch('/api/penjualan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          id_pelanggan: Number(form.id_pelanggan),
          id_produk: Number(form.id_produk),
          jumlah_beli: Number(form.jumlah_beli),
          total_harga: Number(form.total_harga),
        }),
      });
    }
    setForm({ id_pelanggan: '', id_produk: '', jumlah_beli: '', total_harga: '' });
    fetchData();
  };

  const handleEdit = (item: Penjualan) => {
    setForm({
      id_pelanggan: item.id_pelanggan.toString(),
      id_produk: item.id_produk.toString(),
      jumlah_beli: item.jumlah_beli.toString(),
      total_harga: item.total_harga.toString(),
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus?')) {
      await fetch(`/api/penjualan?_id=${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  if (loading) return <div className="p-8 text-center font-bold text-xl">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-bold text-xl">{error}</div>;

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-6xl font-black mb-8" >Data Penjualan</h1>
        <button onClick={fetchData} className="neo-btn neo-btn-green mb-4 text-lg">Refresh Data</button>
        <form onSubmit={handleSubmit} className="neo-card p-6 mb-8 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="ID Pelanggan" value={form.id_pelanggan} onChange={(e) => setForm({ ...form, id_pelanggan: e.target.value })} className="neo-input" required />
            <input type="number" placeholder="ID Produk" value={form.id_produk} onChange={(e) => setForm({ ...form, id_produk: e.target.value })} className="neo-input" required />
            <input type="number" placeholder="Jumlah Beli" value={form.jumlah_beli} onChange={(e) => setForm({ ...form, jumlah_beli: e.target.value })} className="neo-input" required />
            <input type="number" placeholder="Total Harga" value={form.total_harga} onChange={(e) => setForm({ ...form, total_harga: e.target.value })} className="neo-input col-span-2" required />
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
                <th>ID Pelanggan</th>
                <th>ID Produk</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.id_pelanggan}</td>
                  <td>{item.id_produk}</td>
                  <td>{item.jumlah_beli}</td>
                  <td>Rp {item.total_harga.toLocaleString()}</td>
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
