import axios from 'axios';
import { API_ROOT } from 'api-config';

const FETCH_UNPUBLISHED_JOBS = 'FETCH_UNPUBLISHED_JOBS';
const FETCH_PUBLISHED_JOBS = 'FETCH_PUBLISHED_JOBS';
const FETCH_EXPIRED_JOBS = 'FETCH_EXPIRED_JOBS';
const FETCH_FAVORITE_JOBS = 'FETCH_FAVORITE_JOBS';
const RESPONSE_FAVORITES = 'RESPONSE_FAVORITES';

// remember to return to true
const initialState = {
  isLoading: true,
  publishedJobs: [],
  unpublishedJobs: [],
  expiredJobs: [],
  favoriteJobs: [],
};

export function fetchFavoriteJobs() {
  return async (dispatch, getState) => {
    const { currentUser } = getState().app;
    const { data } = await axios.get(
      API_ROOT + `/api/favorites/${currentUser.uuid}`
    );

    // fix this up
    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message,
      });
    }

    dispatch({
      type: FETCH_FAVORITE_JOBS,
      payload: data.jobs,
    });
  };
}

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

export function fetchExpired() {
  return async (dispatch, getState) => {
    const { currentUser } = getState().app;
    const { data } = await axios.get(
      API_ROOT + `/api/jobs/expired/${currentUser.uuid}`
    );

    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message,
      });
    }

    dispatch({
      type: FETCH_EXPIRED_JOBS,
      payload: data,
    });
  };
}

export function unsaveJob(jobUuid) {
  return async (dispatch, getState) => {
    const state = getState();
    const { currentUser } = state.app;
    const { favoriteJobs } = state.account;
    console.log('unsaveJob -> favoriteJobs', favoriteJobs);

    const newFavorites = favoriteJobs.filter((job) => job.uuid !== jobUuid);

    const { data } = await axios.post(
      `${API_ROOT}/api/favorites/remove/${currentUser.uuid}/${jobUuid}`
    );

    dispatch({
      type: RESPONSE_FAVORITES,
      payload: newFavorites,
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
    case FETCH_EXPIRED_JOBS:
      return {
        ...state,
        isLoading: false,
        expiredJobs: payload,
      };
    case FETCH_FAVORITE_JOBS:
      return {
        ...state,
        favoriteJobs: payload,
      };
    case RESPONSE_FAVORITES:
      return {
        ...state,
        favoriteJobs: payload,
      };
    default:
      return state;
  }
}
