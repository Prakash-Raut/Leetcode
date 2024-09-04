import { Router } from "express";
import {
	addProblem,
	deleteProblem,
	getAllProblem,
	getProblem,
	updateProblem,
} from "../controllers/ProblemController";

const problemRouter = Router();

problemRouter.get("/:id", getProblem);

problemRouter.get("/", getAllProblem);

problemRouter.post("/", addProblem);

problemRouter.delete("/:id", deleteProblem);

problemRouter.put("/:id", updateProblem);

export { problemRouter };
