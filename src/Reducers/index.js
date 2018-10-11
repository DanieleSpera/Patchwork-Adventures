import {combineReducers} from 'redux';
import user from './reduces_user';
import goals from './reduces_goals';
import gamesessions from './reduces_gamesession';

export default combineReducers({
    user,
    goals,
    gamesessions
})