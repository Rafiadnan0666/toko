import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-bg)'}}>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-6xl font-black mb-8 text-center">Toko Online</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/pelanggan" className="neo-card p-6 block" style={{backgroundColor: 'var(--color-neo-red)', color: 'white'}}>
            <h2 className="text-3xl font-black mb-2">Pelanggan</h2>
            <p className="font-bold text-lg">Kelola data pelanggan</p>
          </Link>
          <Link href="/produk" className="neo-card p-6 block" style={{backgroundColor: 'var(--color-neo-teal)'}}>
            <h2 className="text-3xl font-black mb-2">Produk</h2>
            <p className="font-bold text-lg">Kelola data produk</p>
          </Link>
          <Link href="/penjualan" className="neo-card p-6 block" style={{backgroundColor: 'var(--color-neo-yellow)'}}>
            <h2 className="text-3xl font-black mb-2">Penjualan</h2>
            <p className="font-bold text-lg">Kelola data penjualan</p>
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link href="/seed" className="neo-btn neo-btn-green text-lg px-8 py-3 inline-block">
            Seed Initial Data
          </Link>
        </div>
      </div>
    </div>
  );
}
