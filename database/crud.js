import connectDB from "./config.js"; // Import the connection function
import ContentReview from "./models.js";

// This function adds a new revyoo(can handle with and without rating)
async function new_revyoo(
  userId,
  contentId,
  serverId,
  apiUsed,
  rating,
  //Without rating case
  review = null
) {
  await connectDB(); // Connect to MongoDB
  const newReview = new ContentReview({
    //Primary key, also check if a user has only one review per content
    _id: userId + "__" + contentId,
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

// Test
// await new_revyoo(
//   "loss",
//   "hehe",
//   "huhu",
//   "IMDB",
//   8.5,
//   "A well-crafted and engaging story..."
// );

//Function to update exsiting reviews (if updating only rating pass 3 parameters, if both pass all and if only review pass null for rating)
async function update_revyoo(userId, contentId, rating, review) {
  // Connect to MongoDB using Mongoose (assuming you have a connection established)
  await connectDB();

  // Validation: Ensure at least one of rating or review is provided
  if (rating === undefined && review === null) {
    throw new Error("Missing required parameter: rating or review");
  }

  // Construct the filter for finding the specific review
  const filter = { _id: `${userId}__${contentId}` };

  // Update logic using findOneAndUpdate with conditional update object
  const updateObject = {};
  if (rating !== null) {
    updateObject.rating = rating;
  }
  if (review) {
    // Check for truthy value (not null)
    updateObject.review = review;
  }

  const updatedReview = await ContentReview.findOneAndUpdate(
    filter,
    { $set: updateObject }, // Update only provided fields
    { new: true } // Return the updated document (optional)
  );

  // Handle the results
  if (updatedReview) {
    const updatedFields = Object.keys(updateObject); // Get updated fields
    let message = "Review updated successfully! ";
    if (updatedFields.length === 1) {
      message += `Updated ${updatedFields[0]} only.`;
    } else {
      message += `Updated ${updatedFields.join(" and ")}`;
    }
    console.log(message);
  } else {
    console.log("No review found for this content");
  }
}

// Test
// await update_revyoo("loss", "hehe", 9, "well-crafted and engaging story...");

async function delete_revyoo(userId, contentId, option = 1) {
  // Connect to MongoDB using Mongoose (assuming you have a connection established)
  await connectDB();

  // Construct the filter with combined key
  const filter = { _id: `${userId}__${contentId}` };

  // Update logic using findOneAndUpdate
  let updatedReview;
  if (option === 0) {
    // Option 0: Delete the whole document
    updatedReview = await ContentReview.deleteOne(filter);
  } else if (option === 1) {
    // Option 1: Delete only review and set it to null
    updatedReview = await ContentReview.findOneAndUpdate(
      filter,
      { $unset: { review: 1 } }, // Remove the "review" field using $unset
      { new: true } // Return the updated document (optional)
    );
  } else {
    throw new Error(
      "Invalid option: Choose 0 for full delete, 1 for review deletion"
    );
  }

  // Handle the results
  if (updatedReview) {
    if (option === 0) {
      console.log("Review deleted successfully!");
    } else {
      console.log("Review content deleted successfully!");
    }
  } else {
    console.log("No review found for this content");
  }
}

// Test
// await delete_revyoo("loss", "hehe", 0);

//This function will get reviews for a server, can be to a user, or a content or the entire server based on nulls passed
async function getReviews(userId = null, contentId = null, serverId) {
  // Connect to MongoDB using Mongoose
  await connectDB();

  // Validation for serverId
  if (serverId === null) {
    throw new Error("Server ID cannot be null");
  }

  // Filter
  const filter = { serverId: serverId };
  if (userId) {
    filter.userId = userId;
  }
  if (contentId) {
    filter.contentId = contentId;
  }

  // Efficient retrieval
  let reviews;
  reviews = await ContentReview.find(filter);

  // Handle results
  if (reviews) {
    return reviews.map((review) => ({
      user_id: review.userId,
      content_id: review.contentId,
      review: review.review,
      rating: review.rating,
    }));
  }
}

// Test
// await new_revyoo(
//   "loss",
//   "hehe",
//   "huhu",
//   "IMDB",
//   8.5,
//   "A well-crafted and engaging story..."
// );
// await new_revyoo(
//   "loss11",
//   "hehe",
//   "huhu",
//   "IMDB",
//   8.5,
//   "A well-crafted and engaging story..."
// );
// await new_revyoo(
//   "loss4",
//   "hehe",
//   "huhu",
//   "IMDB",
//   8.5,
//   "A well-crafted and engaging story..."
// );
// await new_revyoo(
//   "loss5",
//   "hehe",
//   "huhu",
//   "IMDB",
//   8.5,
//   "A well-crafted and engaging story..."
// );
// getReviews("loss", null, "huhu")
//   .then((reviews) => {
//     const etreviews = reviews; // Assuming all retrieved reviews are etreviews
//     console.log(etreviews); // Print the retrieved etreviews (array or object)
//   })
//   .catch((error) => {
//     console.error(error.message); // Handle potential errors
//   });
