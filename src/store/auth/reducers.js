import { LOG_IN, LOG_OUT, SHOW_LOADER, HIDE_LOADER } from '../types';

const initialState = {
  // isLoggedIn: false,
  isLoggedIn: true,
  loading: false
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return { ...state, isLoggedIn: true };
    }
    case LOG_OUT: {
      return { ...state, isLoggedIn: false };
    }
    case SHOW_LOADER: {
      return { ...state, loading: true };
    }
    case HIDE_LOADER: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};
