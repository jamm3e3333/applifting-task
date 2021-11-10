interface TeamsStats {
    name: string;
    clicks: number;
    order: number;
}

export default interface TeamState {
    myTeam: string;
    teams: TeamsStats[] | [];
    myClicks: number;
}