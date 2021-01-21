import {GET_POSTS, UPDATE_LIKES, REMOVE_LIKES, POST_ERROR, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from '../actions/actionTypes'

const initialState = {
    loading: false,
    post: null,
    posts: [],
    error: null
}

export const post = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            }
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            }    
        case UPDATE_LIKES:
            return {
                ...state, 
                posts: state.posts.map(post => post._id === payload.id ? {...post, likes: payload.likes} : post),
                loading: false
            }
        case DELETE_POST: 
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case ADD_POST: {
            return {
                ...state,
                loading: false,
                posts: [payload, ...state.posts],
                post: payload
            }
        } 
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                post: {...state.post, payload}
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comment.filter(comment => comment._id !== payload)
                }
            }           
        case POST_ERROR: 
            return {
                ...state,
                loading: false,
                error: payload 
            }        
        default:
            return state    
    }
}