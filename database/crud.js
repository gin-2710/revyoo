import connectDB from "./config.js"; // Import the connection function
import ContentReview from "./models.js";

const start = async () => {
  await connectDB(); // Connect to MongoDB

  const newReview = new ContentReview({
    userId: "loss", // Use the ObjectID constructor if required
    contentId: "hehe",
    serverId: "huhu",
    apiUsed: "IMDB",
    rating: 8.5,
    review: "A well-crafted and engaging story...",
    // ... other fields
  });

  try {
    await newReview.save();
    console.log("Content review saved successfully");
  } catch (err) {
    console.error("Error saving content review:", err);
  }
};

await start();
