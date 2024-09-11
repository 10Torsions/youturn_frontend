import { ICurrentScenario } from "@/types/ScenarioInterface";

export interface ScenarioContextType {
	scenario: ICurrentScenario[] | null;
	loading: boolean;
	error: Error | null;
	refreshScenario: () => void;  // Refresh Scenario function
}