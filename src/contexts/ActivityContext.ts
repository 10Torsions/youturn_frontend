import { createContext } from "react";
import { IActivityContext } from "../types/ActivityInterface";

export const ActivityContext = createContext<IActivityContext | undefined>(undefined);