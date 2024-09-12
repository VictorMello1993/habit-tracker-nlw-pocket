import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createGoal } from "../../functions/create-goal";
import { createGoalCompletions } from "../../functions/create-goal-completion";

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/completions",
		{
			schema: { body: z.object({ goalId: z.string() }) },
		},
		async (request) => {
			const { goalId } = request.body;
			const result = await createGoalCompletions({
				goalId,
			});

			return result;
		},
	);
};
