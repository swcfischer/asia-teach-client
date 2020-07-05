import axios from 'axios';
import { API_ROOT } from 'api-config';

const STORE_RESULTS = 'STORE_RESULTS';
const SET_LOADING = 'SET_LOADING';
const CLEAR_STATE = 'CLEAR_STATE';
const STORE_PARAMS = 'STORE_PARAMS';
const RESET_PAGE = 'RESET_PAGE';
const STORE_PAGE = 'STORE_PAGE';
// I want to have only one search function
// or one for when I mount
// and one that is a conditional for componentDidUpdate
// comparing the redux props

// this one is when I do a student age filter

export function storeParams(params) {
  return {
    type: STORE_PARAMS,
    payload: params,
  };
}

export function storePage(page) {
  return {
    type: STORE_PAGE,
    payload: Number(page),
  };
}

export function handleSearchQuery(params) {
  return async (dispatch, getState) => {
    const { uuid: userUuid } = getState().app.currentUser;
    const { data } = await axios.get(
      API_ROOT + `/api/resume-board/filter/${userUuid}`,
      {
        params,
      }
    );

    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message,
      });
    }

    dispatch({
      type: STORE_RESULTS,
      payload: data,
    });

    dispatch(storeParams(params));
  };
}

export function resetPage() {
  return {
    type: RESET_PAGE,
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function setLoading(isLoading = true) {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
}

/*
  The params object will eventually contain
  all the filter criteria
  for the search
*/
const initialState = {
  isLoading: true,
  params: {
    country: '',
  },
  page: 1,
  results: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case STORE_RESULTS:
      return {
        ...state,
        isLoading: false,
        results: payload,
      };
    case STORE_PARAMS:
      return {
        ...state,
        params: payload,
      };
    case STORE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case RESET_PAGE:
      return {
        ...state,
        page: 1,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
