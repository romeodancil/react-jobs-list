import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterJobs } from '../actions'
import moment from 'moment'

class SearchJobs extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(e){
        let filter = this.props.jobs.filter((job) => job.companyName.toLowerCase().includes(e.target.value.toLowerCase()));
        this.props.filterJobs(filter)
        console.log('moment', moment().subtract(7, 'days'));
    }

    render() {
        return (
            <div class="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input onChange={this.handleSearch} placeholder="Enter Company Name" id="company_name" type="text" className="validate" />
                    <label className="active" htmlFor="company_name">Search By Company Name</label>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { jobs: state.jobs.jobs }
}

export default connect(mapStateToProps, { filterJobs } )(SearchJobs)