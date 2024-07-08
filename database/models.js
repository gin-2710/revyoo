import mongoose from "mongoose";

const contentReviewSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  contentId: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
  apiUsed: {
    type: String,
    enum: ["IMDB"], // Define allowed API values
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  review: {
    type: String,
    maxlength: 400,
  },
  created: {
    type: Date,
    default: Date.now, // Set default on creation
  },
  lastChanged: {
    type: Date,
    default: Date.now, // Set default on creation
  },
});

// Optionally add lifecycle hooks for auto-updating lastChanged
contentReviewSchema.pre("save", function (next) {
  this.lastChanged = Date.now();
  next();
});

export default mongoose.model("revyoo", contentReviewSchema);
