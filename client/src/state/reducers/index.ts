import { combineReducers } from 'redux';
import teamReducer from './team-reducers';

const reducers = combineReducers({
    teams: teamReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
