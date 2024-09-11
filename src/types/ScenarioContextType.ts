import { ICurrentScenario } from "@/types/ScenarioInterface";

export interface ScenarioContextType {
	baseScenario: ICurrentScenario[] | null;
	currentScenario: ICurrentScenario[] | null;
	loading: boolean;
	error: Error | null;
	refreshScenario: () => void;  // Refresh Scenario function
}