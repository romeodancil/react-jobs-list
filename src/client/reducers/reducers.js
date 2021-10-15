import { FETCH_JOBS, SEARCH_JOBS } from '../actions';

export const jobs =  (state = null, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload.data || [];
    default:
      return state;
  }
}

export const searchJobs = (state = null, action) => {
  switch (action.type) {
    case SEARCH_JOBS:
      return action.payload
    default:
      return state;
  }
}
