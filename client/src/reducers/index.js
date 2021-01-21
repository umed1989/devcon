import {combineReducers} from 'redux';
import {auth} from './auth';
import {post} from './post';
import {profile} from './profile';
import {alerts} from './alert'

const rootReducer = combineReducers({
    auth,
    profile,
    alerts,
    post
})

export default rootReducer;