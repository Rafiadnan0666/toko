import mongoose from 'mongoose';

const ProdukSchema = new mongoose.Schema({
  _id: Number,
  nama_produk: String,
  harga: Number,
  stok: Number,
});

export default mongoose.models.Produk || mongoose.model('Produk', ProdukSchema);
