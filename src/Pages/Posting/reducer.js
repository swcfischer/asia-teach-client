import axios from 'axios';

import { API_ROOT } from 'api-config';

const FETCH_POSTING = 'FETCH_POSTING';
const CLEAR_DATA = 'CLEAR_DATA';
const UPDATE_LIKES = 'UPDATE_LIKES';

export function fetchPosting(uuid) {
  return async (dispatch) => {
    const { data } = await axios.get(API_ROOT + `/api/job/${uuid}`);
    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message,
      });
    }

    document.title = data.job.companyName;

    dispatch({
      type: FETCH_POSTING,
      payload: data.job,
    });
  };
}

export function clearData() {
  return {
    type: CLEAR_DATA,
  };
}

export function updateLikes(payload) {
  return {
    type: UPDATE_LIKES,
    payload,
  };
}

export function logClick(jobUuid) {
  return async (_, __) => {
    const { data } = await axios.post(`${API_ROOT}/api/job/clicks`, {
      uuid: jobUuid,
    });
  };
}

export function logTimeSpent({ timeSpent, uuid }) {
  return async (_, __) => {
    const { data } = await axios.post(`${API_ROOT}/api/job/time`, {
      uuid,
      timeSpent,
    });

    console.log('data', data);
  };
}

const initialState = {
  isLoading: true,
  job: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_POSTING:
      return {
        ...state,
        isLoading: false,
        job: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        job: {
          ...state.job,
          favoritedBy: payload,
        },
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
