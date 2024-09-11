interface TeamMember {
  id: number;
  name: string;
}

export interface IStand {
  id: number;
  name: string;
  nbTeamsOnStand: number;
}
export interface ITeam {
  teamId: number;
  teamName: string;
}
export interface IActivityData {
  name: string;
  activity_date: Date | null;
  activity_start_time: string | null;
  createdAt: Date;
  global_duration: number | null;
  nb_participants: number | null;
  nb_teams: number | null;
  rotation_duration: number | null;
  stand_duration: number | null;
  team: TeamMember[] | null;
  stands: IStand[] | null;
  teams: ITeam[] | null;
  animatorCode: string;
  participantCode: string;
}

export interface IActivityContext {
  activityId: string | number;
  setActivityData: (activityId: string | number) => void;
}
