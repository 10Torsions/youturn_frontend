import ScenarioContext from "@/contexts/ScenarioContext";
import { ScenarioContextType } from "@/types/ScenarioContextType";
import { useContext } from "react";

export const useScenario = (): ScenarioContextType => {
	const context = useContext(ScenarioContext);
	if(!context){
		throw new Error("useScenario must be used within a ScenarioContext")
	}
	return context;
}