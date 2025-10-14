import mongoose from "mongoose";

const HistoricoSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },

  criadoEm: { type: Date, default: Date.now },
});

export default mongoose.model("Historico", HistoricoSchema);