import React, { useState, useEffect, ReactNode } from "react";
import ScenarioContext from "@/contexts/ScenarioContext";
import useFetch from "@/hooks/useFetch";
import { SCENARIO_API } from "@/routes/api/";
import { IScenario, ICurrentScenario } from "@/types/ScenarioInterface";

interface ScenarioProviderProps {
  chosenActivityId: number | string;
  children: ReactNode;
}

export const ScenarioProvider: React.FC<ScenarioProviderProps> = ({ chosenActivityId, children }) => {
  const [baseScenario, setBaseScenario] = useState<ICurrentScenario[] | null>(null);
  const [currentScenario, setCurrentScenario] = useState<ICurrentScenario[] | null>(null);
  const [data, loading, error, fetchData] = useFetch<IScenario[]>(SCENARIO_API.getScenarioByActivityId(chosenActivityId));

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        const scenarioData = data[0];
        setBaseScenario(scenarioData.base_scenario || null);
        setCurrentScenario(scenarioData.current_scenario || null);
      } else {
        setBaseScenario(null);
        setCurrentScenario(null);
      }
    }
  }, [data]);

  const refreshScenario = () => {
    fetchData();  // Appelle la fonction de récupération de données fournie par useFetch
  };

  return <ScenarioContext.Provider value={{ baseScenario, currentScenario, loading, error, refreshScenario }}>{children}</ScenarioContext.Provider>;
};

export default ScenarioProvider;
