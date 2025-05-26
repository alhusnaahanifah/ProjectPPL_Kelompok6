import mongoose from 'mongoose'

const StepSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  tips: [String],
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  note: { type: String, default: '' }
})

const PlantSchema = new mongoose.Schema({
  plantName: { type: String, required: true },
  steps: [StepSchema]
})

export default mongoose.model('Plant', PlantSchema)
