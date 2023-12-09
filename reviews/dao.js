import model from "./model.js";

export const createReview = (review) => model.create(review);
export const findAllReviews = () => model.find();
export const findReviewById = (reviewId) => model.findById(reviewId);
export const findReviewByMovieId = (movieId) =>
    model.find({ movie_id: movieId });
export const findLatestReviews = () => model.find().sort({_id:1}).limit(10); 
export const findReviewByUserId = (userId) =>
    model.find({ user_id: userId });
export const updateReview = (reviewId, review) =>
    model.updateOne({ _id: reviewId }, { $set: review });
export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });


