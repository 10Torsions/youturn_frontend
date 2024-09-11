import { createContext, useContext } from "react";
import { ICurrentScenario } from "@/types/ScenarioInterface";

interface ScenarioContextType {
	scenario: ICurrentScenario[] | null;
	loading: boolean;
	error: Error | null;
	refreshScenario: () => void;  // Refresh Scenario function
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export const useScenario = (): ScenarioContextType => {
	const context = useContext(ScenarioContext);
	if(!context){
		throw new Error("useScenario must be used within a ScenarioContext")
	}
	return context;
}

export default ScenarioContext;