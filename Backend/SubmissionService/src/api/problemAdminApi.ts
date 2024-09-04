import { axiosInstance } from "../config/axiosConfig";
import { PROBLEM_ADMIN_SERVICE_URL } from "../config/env";
import { ProblemResponse } from "../types/problemResponse";

const PROBLEM_ADMIN_API_URL = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;

export async function fetchProblemDetails(problemId: string) {
	try {
		const uri = PROBLEM_ADMIN_API_URL + `/problems/${problemId}`;

		console.log("Fetching problem details from: ", uri);

		const { data } = await axiosInstance.get<ProblemResponse>(uri);

		return data;
	} catch (error) {
		console.log("Something went wrong while fetching problem details");
		console.log(error);
	}
}
