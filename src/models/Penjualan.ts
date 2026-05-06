import mongoose from 'mongoose';

const PenjualanSchema = new mongoose.Schema({
  _id: Number,
  id_pelanggan: { type: Number, ref: 'Pelanggan' },
  id_produk: { type: Number, ref: 'Produk' },
  jumlah_beli: Number,
  total_harga: Number,
});

export default mongoose.models.Penjualan || mongoose.model('Penjualan', PenjualanSchema);
