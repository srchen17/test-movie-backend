import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
        user_id: { type: String, required: true },
        movie_id: { type: Number, required: true },
        review: String,
        rating: { type: Number, required: true }
    },
    { collection: "reviews" });
export default reviewSchema;