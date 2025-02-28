import mongoose from "mongoose"

const GameSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    homeScore: Number,
    awayScore: Number,
    season: { type: mongoose.Schema.Types.ObjectId, ref: "Season", required: true },
    status: { type: String, enum: ["Scheduled", "In Progress", "Final"], required: true },
    arena: String,
    attendance: Number,
  },
  { timestamps: true },
)

export default mongoose.models.Game || mongoose.model("Game", GameSchema)

