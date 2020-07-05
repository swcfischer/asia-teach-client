import axios from 'axios';

const FETCH_POSTING = 'FETCH_POSTING';
const CLEAR_DATA = 'CLEAR_DATA';

export function fetchPosting(uuid) {
  return async dispatch => {
    const { data } = await axios.get(`/api/job/${uuid}`);
    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.message
      });
    }

    dispatch({
      type: FETCH_POSTING,
      payload: data.job
    });
  };
}

export function clearData() {
  return {
    type: CLEAR_DATA
  };
}

const initialState = {
  isLoading: true,
  job: {}
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_POSTING:
      return {
        ...state,
        isLoading: false,
        job: payload
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
