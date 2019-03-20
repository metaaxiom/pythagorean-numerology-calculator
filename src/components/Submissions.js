import React, { Component } from 'react';
import SubmissionItem from './SubmissionItem';

class Submissions extends Component {

    render(){
        return(
            <div className="container">
                { this.props.submissions.map((submission, key) => (
                    <SubmissionItem key={key} submission={submission} />
                )) }
            </div>
        )
    }

}

export default Submissions;