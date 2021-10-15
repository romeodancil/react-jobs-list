import { combineReducers } from 'redux';
import {searchJobs, jobs} from './reducers';

export default combineReducers({
  jobs: jobs,
  search: searchJobs
});
