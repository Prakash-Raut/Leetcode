import { Router } from "express";
import { problemRouter } from "./ProblemRouter";

const v1Router = Router();

v1Router.use("/problems", problemRouter);

export { v1Router };
