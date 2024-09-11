import { ScenarioContextType } from "@/types/ScenarioContextType";
import { createContext } from "react";


const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export default ScenarioContext;