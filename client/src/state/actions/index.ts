import { ActionType } from '../action-types/index';
import TeamState from '../reducers/state-types';

interface GetStats {
    type: ActionType.GET_STATS;
    payload: TeamState;
}

interface JoinTeam {
    type: ActionType.JOIN_TEAM;
    payload: {
        myTeam: string;
    };
}

interface ClickUser {
    type: ActionType.CLICK_USER;
    payload: {
        myClicks: number;
    }
}

export type Actions = 
| GetStats
| JoinTeam
| ClickUser;