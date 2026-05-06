import mongoose from 'mongoose';

const PelangganSchema = new mongoose.Schema({
  _id: Number,
  nama_pelanggan: String,
  alamat: String,
  no_telp: String,
});

export default mongoose.models.Pelanggan || mongoose.model('Pelanggan', PelangganSchema);
