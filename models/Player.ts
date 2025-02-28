import mongoose from "mongoose"

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: String,
    height: String,
    weight: String,
    birthDate: Date,
    birthPlace: String,
    college: String,
    draftYear: Number,
    draftRound: Number,
    draftNumber: Number,
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema)

