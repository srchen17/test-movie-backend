import express from 'express';
import session from "express-session";

import cors from "cors";
// import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import ReviewRoutes from './reviews/routes.js';

import "dotenv/config"; 

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/movie';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);


const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: false,
    };
}
app.use(session(sessionOptions));

UserRoutes(app);
ReviewRoutes(app);

app.listen(4000);