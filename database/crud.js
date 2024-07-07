import connectDB from "./config.js"; // Import the connection function
import ContentReview from "./models.js";

async function new_revyoo(
  userId,
  contentId,
  serverId,
  apiUsed,
  rating,
  review
) {
  await connectDB(); // Connect to MongoDB
  const newReview = new ContentReview({
    userId: userId,
    contentId: contentId,
    serverId: serverId,
    apiUsed: apiUsed,
    rating: rating,
    review: review,
  });

  try {
    await newReview.save();
    console.log("Content review saved successfully");
  } catch (err) {
    console.error("Error saving content review:", err);
  }
}

await new_revyoo(
  "loss",
  "hehe",
  "huhu",
  "IMDB",
  8.5,
  "A well-crafted and engaging story..."
);
