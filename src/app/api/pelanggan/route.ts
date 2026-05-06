import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Pelanggan from '@/models/Pelanggan';

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Pelanggan.find({}).lean();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('GET /api/pelanggan error:', error);
    return NextResponse.json({ error: 'Failed to fetch data. Make sure MongoDB is running.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    if (!body._id) {
      const maxDoc = await Pelanggan.findOne().sort({ _id: -1 }).limit(1);
      body._id = maxDoc ? maxDoc._id + 1 : 1;
    }
    const data = await Pelanggan.create(body);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('POST /api/pelanggan error:', error);
    return NextResponse.json({ error: 'Failed to create data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const data = await Pelanggan.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('PUT /api/pelanggan error:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('_id');
    await Pelanggan.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Data deleted' });
  } catch (error: any) {
    console.error('DELETE /api/pelanggan error:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
