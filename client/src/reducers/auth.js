import {SET_ALERT, REMOVE_ALERT, REGISTER_FAILURE, REGISTER_SUCCESS, ACCOUNT_DELETED, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../actions/actionTypes'

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: true
};

// function alertReducer(state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_ALERT:
//       return [...state, payload];
//     case REMOVE_ALERT:
//       return state.filter(alert => alert.id !== payload);
//     default:
//       return state;
//   }
// } 

export  const auth = (state = initialState, action) => {
    const { type, payload } = action;
        switch(type) {
            case USER_LOADED:
                return {
                    ...state, 
                    isAuthenticated: true,
                    loading: false,
                    user: payload
                }

            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:    
                localStorage.setItem('token', payload.token)
                return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false
                  };
            
            // case REGISTER_FAILURE:
            case LOGOUT:
            case ACCOUNT_DELETED:        
            // case LOGIN_FAIL:
            // case AUTH_ERROR:    
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    user: null
                  };
            
            default:
                return state;    
    }
} 

 
