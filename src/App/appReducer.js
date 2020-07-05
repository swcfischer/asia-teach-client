import axios from 'axios';
import { toast } from 'react-toastify';

const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
const ERASE_CURRENT_USER = 'ERASE_CURRENT_USER';
const STORE_CURRENT_USER = 'STORE_CURRENT_USER';
const ERROR = 'ERROR';

export function fetchCurrentUser() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch({
        type: FETCH_CURRENT_USER,
        payload: null,
      });
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axios.get('/api/current_user');
    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message,
      });
    }
    dispatch({
      type: FETCH_CURRENT_USER,
      payload: data.currentUser,
    });
  };
}

export function storeCurrentUser(currentUser) {
  return {
    type: STORE_CURRENT_USER,
    payload: currentUser,
  };
}

export function eraseCurrentUser() {
  return {
    type: ERASE_CURRENT_USER,
  };
}

const initialState = {
  currentUser: null,
  isLoading: true,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ERROR:
      toast.error(payload);
      return state;
    case FETCH_CURRENT_USER:
      return {
        ...state,
        isLoading: false,
        currentUser: payload,
      };
    case ERASE_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case STORE_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
}
