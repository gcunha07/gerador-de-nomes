import mongoose from "mongoose"; 

const NomeSchema = new mongoose.Schema({ 
  nome: { type: String, required: true }, 
});

export default mongoose.model("Nome", NomeSchema);