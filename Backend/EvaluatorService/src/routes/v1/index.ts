import express from "express";
import { submissionRouter } from "./submissionRoute";

const v1Router = express.Router();

v1Router.use("/submissions", submissionRouter);

export { v1Router };
