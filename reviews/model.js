import mongoose from "mongoose";
import reviewSchema from "./schema.js";
const model = mongoose.model("reviews", reviewSchema);
export default model;