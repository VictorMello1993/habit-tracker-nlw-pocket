import dayjs from "dayjs";
import { client, db } from "./index";
import { goalCompletions, goals } from "./schema";

async function seed() {
	await db.delete(goalCompletions);
	await db.delete(goals);

	const firstGoals = await db
		.insert(goals)
		.values([
			{ title: "Acordar cedo", desiredWeeklyFrequency: 5 },
			{ title: "Treinar", desiredWeeklyFrequency: 3 },
			{ title: "Aula de inglês", desiredWeeklyFrequency: 1 },
		])
		.returning();

	const startOfWeek = dayjs().startOf("week"); //Domingo

	await db.insert(goalCompletions).values([
		{ goalId: firstGoals[0].id, createdAt: startOfWeek.toDate() },
		{ goalId: firstGoals[1].id, createdAt: startOfWeek.add(1, "day").toDate() },
	]);
}

seed().finally(() => client.end());
