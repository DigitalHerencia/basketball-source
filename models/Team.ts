import mongoose from "mongoose"

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    abbreviation: { type: String, unique: true },
    city: String,
    conference: String,
    division: String,
    founded: Number,
    arena: String,
    championships: [Number],
  },
  { timestamps: true },
)

export default mongoose.models.Team || mongoose.model("Team", TeamSchema)

