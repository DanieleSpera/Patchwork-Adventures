import {SET_GAMESESSION} from '../constants';

export default (state = [],action) => {
    switch (action.type){
        case 'SET_GAMESESSION':
            const {gamesessions} = action;
            return gamesessions;
        default:
            return state;
    }

}