// models/pertanyaan.ts
import mongoose from 'mongoose'

const PertanyaanSchema = new mongoose.Schema({
  pertanyaan: { 
    type: String, 
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'pertanyaan'
})

// Index untuk pencarian yang lebih cepat
PertanyaanSchema.index({ pertanyaan: 1 })

const Pertanyaan = mongoose.model('Pertanyaan', PertanyaanSchema)
export default Pertanyaan