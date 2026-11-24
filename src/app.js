// Import Important Properties
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import Routers
import userRouter from './routes/user.routes.js'

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "16kb",
  }),
);

// study
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static("public"));
app.use(cookieParser());

// Using Routers:

// http://localhost:8000/api/v1/users
app.use('/api/v1/users', userRouter);


export { app };
