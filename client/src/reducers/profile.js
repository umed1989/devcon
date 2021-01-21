import {GET_PROFILE, GET_REPOS,GET_PROFILES, PROFILE_ERROR, CLEAR_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, ACCOUNT_DELETED} from '../actions/actionTypes';

const initialState = {
    profile: null,
    profiles: [],
    loading: false,
    error: {},
    repos: {}
}

export const profile = (state = initialState, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state, 
                profile: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                loading: false,
                repos: action.payload
            }    
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }    
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_PROFILE:
            return {
                ...state, 
                profile: null,
                repos: []
            }
        case CREATE_PROFILE:
        case UPDATE_PROFILE:    
            return {
                ...state,
                profile: action.payload,
                loading: true
            }
        case ACCOUNT_DELETED:
            return {
                profile: action.payload,
                loading: false,
                ...state
            }            
        default:
            return state;        
    }
}