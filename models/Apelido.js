import mongoose from "mongoose";

const ApelidoSchema = new mongoose.Schema({
  apelido: { type: String, required: true },
});

export default mongoose.model("Apelido", ApelidoSchema);