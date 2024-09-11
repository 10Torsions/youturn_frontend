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
  const [scenario, setScenario] = useState<ICurrentScenario[] | null>(null);
  const [data, loading, error, fetchData] = useFetch<IScenario[]>(SCENARIO_API.getScenarioByActivityId(chosenActivityId));

  useEffect(() => {
    if (data && data.length > 0 && data[0].base_scenario) {
      setScenario(data[0].base_scenario);
		console.log(data);
    }
  }, [data]);

  const refreshScenario = () => {
    fetchData();  // Appelle la fonction de récupération de données fournie par useFetch
  };

  return <ScenarioContext.Provider value={{ scenario, loading, error, refreshScenario }}>{children}</ScenarioContext.Provider>;
};

export default ScenarioProvider;
