import React, { Component } from 'react';

class AddSubmission extends Component {

    state = {
        phrase: ''
    };

    render(){
        return(
            <form id="primaryInputForm" onSubmit={this.onSubmit}>
                <div className="container">
                    <input 
                        type="text" 
                        name="phrase" 
                        placeholder="Word or phrase to reduce ..."
                        id="primaryInput"
                        value={this.state.phrase} 
                        onChange={this.onChange} />
                    <button id="primaryInputBtn">Deduce</button>
                </div>
            </form>
        )
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this.validateInput(this.state.phrase)){
            this.props.addSubmission(this.state.phrase);
        }else{
            alert("Submission can only contain letters");
        }
        // clear state
        this.setState({ phrase: '' });
    }

    onChange = (e) => {
        /*
        doesn't check validity of input
        but onSubmit does
        */
        this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }

    validateInput = (input) => {
        // . , ; -

        // only letters allowed
        //return /^[a-z]+$/i.test(input);
        return true;
    }

}

export default AddSubmission;