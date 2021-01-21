import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {setAuthToken} from '../utils/setAuthToken'
import {SET_ALERT, ACCOUNT_DELETED, ADD_COMMENT, REMOVE_COMMENT ,ADD_POST, GET_POST,DELETE_POST, POST_ERROR, REMOVE_LIKES, UPDATE_LIKES, GET_POSTS, GET_REPOS, REMOVE_ALERT, GET_PROFILES, REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT, GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, CREATE_PROFILE} from './actionTypes';

export const getProfile = () => async dispatch => {
    try {
        const profile = await axios.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: profile.data
        })
    } catch(error) {
        console.log(error)
        dispatch({type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }})    
 }
}

//GET PROFILE BY ID
export const getProfileById = userId => async dispatch => {
    try {
        const profile = await axios.get(`/profile/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: profile.data
        })
    } catch(error) {
        dispatch({type: PROFILE_ERROR})    
 }
}

export const getProfiles = () => async dispatch => {
    try {
        const profiles = await axios.get('/profile');

        console.log(profiles)

        dispatch({
            type: GET_PROFILES,
            payload: profiles.data
        })
    } catch(error) {
        console.log(error.message)
        dispatch({type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }})    
 }
}

//Get github repos
export const getGithubRepos = githubUsername => async dispatch => {
    try {
        const repos = await axios.get(`/profile/github/${githubUsername}`);

        dispatch({
            type: GET_REPOS,
            payload: repos.data
        })
    } catch(error) {
        console.log(error.message)
        dispatch({type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }})    
 }
}

export const createProfile = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post('/profile', formData, config);

        dispatch({
            type: CREATE_PROFILE,
            payload: response.data
        })

        dispatch(setAlert({type: 'Profile Created!'}))

        history.push('/dashboard')

    } catch(err){
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
    
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    
}

export const updateProfile = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.put('/profile', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        })

        dispatch(setAlert({type: 'Profile Updated!'}))

        history.push('/dashboard')
        
    } catch(err){
        console.log(err)
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
    
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    
}

export const loadUser = () => async dispatch => {
    try {

     if(localStorage.token) {
         setAuthToken(localStorage.token)
     }

     const res = await axios.get('/auth')

     dispatch({type: USER_LOADED, payload: res.data});

    } catch (error) {
        console.log(error)
        dispatch({type: AUTH_ERROR})
    }
}

export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
    dispatch({type: CLEAR_PROFILE})
}
   
export const register = ({name, email, password}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({name, email, password});
        const response = await axios.post('/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser())

    } catch (error) {
        const errors = error.response.data.error;
        console.log(errors);
        dispatch({
            type: REGISTER_FAILURE
        })
    }
}

export const login = ( email, password) => async dispatch => {
    try {
        const body = { email, password };
       
        const response = await axios.post('/auth', body);

        console.log(response.data)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser())

        dispatch(setAlert('Nashudi', 'danger', 100))

    } catch (error) {
        
        console.log(error);
        dispatch({
            type: REGISTER_FAILURE
        })
    }
}

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.put('/profile/experience', formData, config);

        console.log(response)

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.profile
        })

        dispatch(setAlert({type: 'Experience Updated!'}))

        history.push('/dashboard')
    } catch(err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR
          });
    }
}

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.put('/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        })

        dispatch(setAlert({type: 'Education Updated!'}))

        history.push('/dashboard')
    } catch(err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
}

export const deleteExperience = id => async dispatch => {
    try {
        const response = await axios.delete(`/profile/experience/${id}`)
       
        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data.profile
        })
        dispatch(setAlert({type: 'Experience Removed!'}))
    } catch (error) {
        console.log(error)
        dispatch({
            type: PROFILE_ERROR
          });
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const response = await axios.delete(`/profile/education/${id}`)

        console.log(response)
        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        })
        dispatch(setAlert({type: 'Education Removed!'}))
    } catch (error) {
        console.log(error)
        dispatch({
            type: PROFILE_ERROR
          });
    }
}

export const deleteAccount = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.delete('/profile', config);

        dispatch({
            type: ACCOUNT_DELETED,
            })

        dispatch(setAlert({type: 'Account Deleted!'}))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR
          });
    }
}

export const getPosts = () => async dispatch => {
    try {
        const response = await axios.get('/posts')

        console.log(response.data)

        dispatch({
            type: GET_POSTS,
            payload: response.data
        })
    } catch(err){
        console.log(err)
    }
}

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const updateLike = id => async dispatch => {
    try {
        const response = await axios.put(`/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: response.data}
        })
    } catch (error) {
        console.log(console.error)
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const deleteLike = id => async dispatch => {
    try {
        const response = await axios.put(`/posts/unlike/${id}`)

        dispatch({
            type: REMOVE_LIKES,
            payload: {id, likes: response.data}
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const deletePost = id => async dispatch => {
    try {
         await axios.delete(`/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post Deleted!', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addPost = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res =  await axios.post(`/posts`, formData, config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Added!', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })

    } catch(error){
        console.log(error)
        dispatch({
            type: POST_ERROR,
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res =  await axios.post(`/posts/${postId}`, formData, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment Added!', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const deleteComment = (postId, comment_id) => async dispatch => {
    try { 
         await axios.delete(`/posts/post/${postId}/${comment_id}`)

        dispatch({
            type: REMOVE_COMMENT,
            payload: comment_id
        })

        dispatch(setAlert('Comment Deleted!', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}