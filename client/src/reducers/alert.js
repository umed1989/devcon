import { SET_ALERT, REMOVE_ALERT } from '../actions/actionTypes';

const initialState = [];

export const alerts = (state = initialState, action)=> {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload.msg];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}