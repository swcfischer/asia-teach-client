import axios from 'axios';
import { API_ROOT } from 'api-config';

const FETCH_UNPUBLISHED_JOBS = 'FETCH_UNPUBLISHED_JOBS';
const FETCH_PUBLISHED_JOBS = 'FETCH_PUBLISHED_JOBS';

// remember to return to true
const initialState = {
  isLoading: true,
};

export function fetchUnpublished() {
  return async (dispatch, getState) => {
    const { currentUser } = getState().app;
    const { data } = await axios.get(
      API_ROOT + `/api/jobs/unpublished/user/${currentUser.uuid}`
    );

    // fix this up
    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message,
      });
    }

    dispatch({
      type: FETCH_UNPUBLISHED_JOBS,
      payload: data.unpublishedJobs,
    });
  };
}

export function fetchPublished() {
  return async (dispatch, getState) => {
    const { currentUser } = getState().app;
    const { data } = await axios.get(
      API_ROOT + `/api/jobs/published/${currentUser.uuid}?page=1`
    );

    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message,
      });
    }

    dispatch({
      type: FETCH_PUBLISHED_JOBS,
      payload: data,
    });
  };
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_UNPUBLISHED_JOBS:
      return {
        ...state,
        isLoading: false,
        unpublishedJobs: payload,
      };
    case FETCH_PUBLISHED_JOBS:
      return {
        ...state,
        isLoading: false,
        publishedJobs: payload,
      };
    default:
      return state;
  }
}
