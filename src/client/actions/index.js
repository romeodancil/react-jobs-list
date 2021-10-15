export const FETCH_JOBS = 'fetch_jobs';
export const SEARCH_JOBS = 'search_jobs';

export const fetchJobs = () => async (dispatch, getState, api) => {
  const resp = await api.post('/api/jobs/', {
    "companySkills": true,
    "dismissedListingHashes": [],
    "fetchJobDesc": true,
    "jobTitle": "Business Analyst",
    "locations": [],
    "numJobs": 10,
    "previousListingHashes": []
  });

  dispatch({
    type: FETCH_JOBS,
    payload: resp
  })
}

export const filterJobs = (filteredJobs) => async (dispatch) => {
  dispatch({
    type: SEARCH_JOBS,
    payload: filteredJobs
  })
}
