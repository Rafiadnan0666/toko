import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Pelanggan from '@/models/Pelanggan';
import Produk from '@/models/Produk';
import Penjualan from '@/models/Penjualan';

export async function POST() {
  try {
    await connectToDatabase();

    await Pelanggan.deleteMany({});
    await Produk.deleteMany({});
    await Penjualan.deleteMany({});

    const pelangganData = [
      { _id: 101, nama_pelanggan: 'Andi', alamat: 'Jakarta', no_telp: '0811111111' },
      { _id: 102, nama_pelanggan: 'Siti', alamat: 'Bandung', no_telp: '0822222222' },
      { _id: 103, nama_pelanggan: 'Budi', alamat: 'Surabaya', no_telp: '0833333333' },
      { _id: 104, nama_pelanggan: 'Dewi', alamat: 'Yogyakarta', no_telp: '0844444444' },
    ];

    const produkData = [
      { _id: 1, nama_produk: 'Laptop Asus', harga: 8000000, stok: 5 },
      { _id: 2, nama_produk: 'Mouse Logitech', harga: 150000, stok: 20 },
      { _id: 3, nama_produk: 'Keyboard Mechanical', harga: 500000, stok: 8 },
      { _id: 4, nama_produk: 'Monitor Samsung', harga: 2000000, stok: 12 },
    ];

    const penjualanData = [
      { _id: 1001, id_pelanggan: 101, id_produk: 1, jumlah_beli: 1, total_harga: 8000000 },
      { _id: 1002, id_pelanggan: 102, id_produk: 2, jumlah_beli: 2, total_harga: 300000 },
      { _id: 1003, id_pelanggan: 103, id_produk: 3, jumlah_beli: 1, total_harga: 500000 },
      { _id: 1004, id_pelanggan: 104, id_produk: 4, jumlah_beli: 1, total_harga: 2000000 },
    ];

    await Pelanggan.insertMany(pelangganData);
    await Produk.insertMany(produkData);
    await Penjualan.insertMany(penjualanData);

    return NextResponse.json({ message: 'Data seeded successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
