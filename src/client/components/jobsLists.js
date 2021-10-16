import React, { Component } from 'react'

export default class JobsList extends Component {

    renderJobsLists(jobs) {
        return jobs.map((job) => {
            return (
                <li className="collection-item avatar" key={job.id}>
                    <i className="material-icons circle green">insert_chart</i>
                    <span style={{color: '#ee6e73'}} className="title">{job.companyName}</span>
                    <hr/>
                    <p>
                        <span style={{color: '#26a69a'}}>{job.jobTitle}</span>
                        <br />
                        {job.shortDesc}
                    </p>
                    <span className="secondary-content">{job.postedDate}</span>
                </li>
            );
        });
    }

    render() {
        const { jobs } = this.props
        if (!jobs) return  <ul className="collection"></ul>;

        return (
            <ul className="collection">
                {this.renderJobsLists(jobs)}
            </ul>
        )
    }
}
