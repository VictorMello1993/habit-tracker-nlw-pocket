import { useQuery } from "@tanstack/react-query";
import { CreateGoal } from "./components/create-goal";
import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";
import { Dialog } from "./components/ui/dialog";
import { getSummary } from "./http/get-summary";

type SummaryResponse = {
	completed: number;
	total: number;
	goalsPerDay: Record<
		string,
		{
			id: string;
			title: string;
			completedAt: string;
		}[]
	>;
};

export function App() {
	const { data } = useQuery({
		queryKey: ["summary"],
		queryFn: getSummary,
		staleTime: 1000 * 60, //60seg
	});

	return (
		<Dialog>
			{data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}
			<CreateGoal />
		</Dialog>
	);
}

export default App;
