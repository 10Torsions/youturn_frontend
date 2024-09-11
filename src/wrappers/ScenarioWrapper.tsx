import React, { useContext } from "react";
import { ActivityContext } from "@/contexts/ActivityContext";
import { IActivityContext } from "../types/ActivityInterface";

import ScenarioProvider from "@/providers/ScenarioProvider";

interface ScenarioWrapperProps {
  children: React.ReactNode;
}

const ScenarioWrapper: React.FC<ScenarioWrapperProps> = ({ children }) => {
  const activityContext = useContext<IActivityContext | undefined>(ActivityContext);
  if (!activityContext) {
    throw new Error("useContext must be used within an ActivityProvider");
  }

  const { activityId } = activityContext;
  return <ScenarioProvider chosenActivityId={activityId}>{children}</ScenarioProvider>;
};

export default ScenarioWrapper;
