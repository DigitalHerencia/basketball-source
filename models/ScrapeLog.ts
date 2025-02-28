import mongoose, { type Document, Schema } from "mongoose"

// Interface to define the structure of a ScrapeLog document
interface IScrapeLog extends Document {
  source: string
  type: string
  status: "in_progress" | "success" | "error"
  message?: string
  itemsProcessed: number
  startTime: Date
  endTime?: Date
}

// Schema definition for ScrapeLog
const ScrapeLogSchema: Schema = new Schema(
  {
    source: { type: String, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["in_progress", "success", "error"],
    },
    message: { type: String },
    itemsProcessed: { type: Number, default: 0 },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
)

// Create and export the model
const ScrapeLog = mongoose.models.ScrapeLog || mongoose.model<IScrapeLog>("ScrapeLog", ScrapeLogSchema)

export default ScrapeLog

