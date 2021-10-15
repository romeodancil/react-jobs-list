import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../actions';
import JobsLists from '../components/jobsLists'
import SearchJobs from '../components/searchJobs'

class HomePage extends Component {
  componentDidMount() {
      this.props.fetchJobs();
  }

  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <div className="co1">
            <h5>Jobs List</h5>
          </div>
        </div>
        <div className="row">
          <div div className="col m4 l4 s12">
            <SearchJobs/>
          </div>
          <div className="col m8 l8 s12">
            <JobsLists jobs={this.props.jobs} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let searchData = state.search;
  return { 
    jobs: (searchData) ? searchData : state.jobs.jobs
  }
}

function loadData(store) {
  return store.dispatch(fetchJobs());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchJobs })(HomePage)
}
