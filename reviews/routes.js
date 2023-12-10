import * as dao from "./dao.js";
let currentReview = null;

function ReviewRoutes(app) {
    const findLatestReviews = async (req, res) => {
        console.log("IN find latest reviews");
        const reviews = await dao.findLatestReviews();
        res.json(reviews);
    }

    const createReview = async (req, res) => {
        console.log("IN create review");
        console.log(req.body);
        if (req.body.rating > 100 || req.body.rating < 0) {
            res.status(400).json(
            { message: "Rating must be between 0 and 100." });
        } else {
        try {
        const review = await dao.createReview(req.body);
        res.json(review);
        }
        catch (error) {
            res.status(400).json(error);

        }
    }
    }

    const deleteReview = async (req, res) => {
        const status = await dao.deleteReview(req.params.reviewId);
        res.json(status);
    };

    const findAllReviews = async (req, res) => {
        console.log("IN find all reviews");
        const reviews = await dao.findAllReviews();
        res.json(reviews);
    };

    const findReviewById = async (req, res) => {
        console.log("IN find review by id");
        const review = await dao.findReviewById(req.params.reviewId);
        res.json(review);
    };

    const findReviewByMovieId = async (req, res) => {
        console.log("IN find review by movie id");
        const review = await dao.findReviewByMovieId(req.params.movieId);
        res.json(review);
    };

    const findReviewByUserId = async (req, res) => {
        console.log("IN find review by user id");
        const review = await dao.findReviewByUserId(req.params.userId);
        res.json(review);
    };

    const updateReview = async (req, res) => {
        console.log("IN update review");
        const { reviewId } = req.params;
        const status = await dao.updateReview(reviewId, req.body);
        // currentReview = await dao.findReviewById(reviewId);
        // const currentUser = await dao.findUserById(userId);
        // req.session['currentUser'] = currentUser;
        res.json(status);
    };

    app.get("/api/reviews/latest", findLatestReviews);

    app.post("/api/reviews", createReview);
    app.get("/api/reviews", findAllReviews);
    app.get("/api/reviews/:reviewId", findReviewById);

    app.get("/api/reviews/movie/:movieId", findReviewByMovieId);
    app.get("/api/reviews/user/:userId", findReviewByUserId);

    app.put("/api/reviews/:reviewId", updateReview);
    app.delete("/api/reviews/:reviewId", deleteReview);
}
export default ReviewRoutes;