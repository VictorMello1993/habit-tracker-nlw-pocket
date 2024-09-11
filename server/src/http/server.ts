import fastify from "fastify";
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import z from "zod";
import { createGoal } from "../functions/create-goal";
import { createGoalCompletions } from "../functions/create-goal-completion";
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/pending-goals", async () => {
	const { pendingGoals } = await getWeekPendingGoals();
	return pendingGoals;
});

app.post(
	"/goals",
	{
		schema: {
			body: z.object({
				title: z.string(),
				desiredWeeklyFrequency: z.number().int().min(1).max(7),
			}),
		},
	},
	async (request) => {
		const { title, desiredWeeklyFrequency } = request.body;

		await createGoal({
			title,
			desiredWeeklyFrequency,
		});
	},
);

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

const port = 3333;

app.listen({ port }).then(() => {
	console.log(`Server is running at ${port}`);
});
