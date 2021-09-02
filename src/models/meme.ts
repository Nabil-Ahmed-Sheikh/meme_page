import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IMeme{
  url: string;
}

const memeSchema = new Schema<IMeme>({
  url: {
    type: String,
    required: true
  }
}, {timestamps: true});

const MemeModel = model<IMeme>('Meme', memeSchema);

export default MemeModel