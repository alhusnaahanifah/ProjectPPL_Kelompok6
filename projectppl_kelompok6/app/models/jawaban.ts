// models/jawaban.ts
import mongoose from 'mongoose'

interface UserAnswer {
  question: string
  answer: string
}

const JawabanSchema = new mongoose.Schema({
  Tumbuhan: { 
    type: String, 
    required: true,
    trim: true
  }
  // jawaban pertanyaan disimpan sebagai key dinamis
  // contoh: "Apakah Anda lebih suka tanaman yang mudah ditanam dan tidak rumit?": "Ya"
}, { 
  strict: false, // Memungkinkan field dinamis
  timestamps: true,
  collection: 'jawaban'
})

// Index untuk pencarian berdasarkan tumbuhan
JawabanSchema.index({ Tumbuhan: 1 })

// Method untuk mendapatkan jawaban tanpa field sistem
JawabanSchema.methods.getAnswersOnly = function() {
  const obj = this.toObject()
  const { _id, Tumbuhan, __v, createdAt, updatedAt, ...answers } = obj
  return {
    id: _id,
    tumbuhan: Tumbuhan,
    jawaban: answers
  }
}

// Static method untuk mencari berdasarkan jawaban
JawabanSchema.statics.findByAnswers = function(userAnswers: UserAnswer[]) {
  const pipeline: mongoose.PipelineStage[] = [
    {
      $addFields: {
        score: {
          $sum: userAnswers.map((ua) => ({
            $cond: [
              { $eq: [`$${ua.question}`, ua.answer] },
              1,
              0
            ]
          }))
        }
      }
    },
    {
      $sort: { score: -1 as const } // agar dikenali TypeScript sebagai valid Sort
    }
  ]

  return this.aggregate(pipeline)
}


const Jawaban = mongoose.model('Jawaban', JawabanSchema)
export default Jawaban