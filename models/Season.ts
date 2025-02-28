import mongoose from "mongoose"

const SeasonSchema = new mongoose.Schema(
  {
    year: { type: String, unique: true, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    league: { type: String, required: true },
    champion: String,
    mvp: String,
    finalsMvp: String,
  },
  { timestamps: true },
)

export default mongoose.models.Season || mongoose.model("Season", SeasonSchema)

