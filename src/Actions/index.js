import {SIGNED_IN,SET_GOALS,SET_GAMESESSION} from '../constants';

export function logUser(email){
    const action ={
        type: SIGNED_IN,
        email
    }
    return action
};

export function setGoals(goals){
    const action = {
        type : SET_GOALS,
        goals //{goals : goals}
    }
    return action
};

export function setGamesession(gamesessions){
    const action = {
        type : SET_GAMESESSION,
        gamesessions
    }
    return action
};