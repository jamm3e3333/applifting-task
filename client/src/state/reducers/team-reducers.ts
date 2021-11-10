import TeamState from './state-types';
import { Actions } from '../actions/index';

const initialUserState: TeamState = {
    myTeam: '',
    teams: [],
    myClicks: 0,
}

const reducer = (
    state: TeamState = initialUserState,
    action: Actions,
) => {
    switch(action.type) {
        case 'GET_STATS':
            return {
                myTeam: state.myTeam,
                teams: action.payload.teams,
                myClicks: state.myClicks,
            }
        case 'JOIN_TEAM':
            return {
                myTeam: action.payload.myTeam,
                teams: state.teams,
                myClicks: state.myClicks,
            }   
        case 'CLICK_USER':
            return {
                myTeam: state.myTeam,
                teams: state.teams,
                myClicks: action.payload.myClicks,
            }
        default: return state;
    }
}

export default reducer;
