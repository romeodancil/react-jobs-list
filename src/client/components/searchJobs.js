import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterJobs } from '../actions'
import moment from 'moment'

class SearchJobs extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.state = {
            toggle: false
        }
    }

    handleSearch(e){
        const filter = this.props.jobs.filter((job) => job.companyName.toLowerCase().includes(e.target.value.toLowerCase()));
        this.props.filterJobs(filter)
    }

    handleToggle(e) {
        const { jobs } = this.props
        const checked = e.target.checked
        this.setState({
            toggle: checked
        })

        if (checked) {
            const final = moment().subtract(7,'d').format('YYYY-MM-DD');
            const filterByLast7Days = this.props.jobs.filter((filt) => final <= moment(filt.OBJpostingDate).format('YYYY-MM-DD'))
            this.props.filterJobs(filterByLast7Days)
        } else {
            this.props.filterJobs(jobs)
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="input-field">
                        <i className="material-icons prefix">search</i>
                        <input onChange={this.handleSearch} placeholder="Enter Company Name" id="company_name" type="text" className="validate" />
                        <label className="active" htmlFor="company_name">Search By Company Name</label>
                    </div>
                </div>
                <div className="col s12">
                    <label>
                        <i className="material-icons left">today</i>
                        Filter Post From Last 7 Days
                    </label>
                    <div className="switch">
                        <label>
                        Off
                        <input checked={this.state.toggle} onChange={this.handleToggle} type="checkbox"/>
                        <span className="lever"></span>
                        On
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { jobs: state.jobs.jobs }
}

export default connect(mapStateToProps, { filterJobs } )(SearchJobs)