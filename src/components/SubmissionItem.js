import React, { Component } from 'react';

class SubmissionItem extends Component {
    render(){
        return(

            <div>          
                <span className="label">Phrase:</span>
                <p style={{marginTop: '0', marginBottom: '1.5rem'}}>{ this.props.submission.phrase }</p>

                <table>
                    <tbody>
                    { this.props.submission.words.map((word, index)=>(
                        <React.Fragment>
                            <tr>
                                {word.split("").map( (ltr, ltrIndex)=>(
                                    <th>{ltr}</th>
                                ))}
                            </tr>
                            <tr>
                                { this.props.submission.normalTransposByLtr[index].map( (num)=>(
                                    <td>{num}</td>
                                ) ) }
                            </tr>
                            <tr>
                                { this.props.submission.pythTransposByLtr[index].map( (num)=>(
                                    <td>{num}</td>
                                ) ) }
                            </tr>
                        </React.Fragment>
                    )) }
                    </tbody>
                </table>

                <p>Essence of phrase: { this.props.submission.essence }</p>
                <p>Normal alphabet sum: { this.props.submission.normalSumTotal }</p>
                <p>Pythagorean alphabet sum: { this.props.submission.pythSumTotal }</p>
                <p>Normal transposition by word: { this.props.submission.normalTransposByWord.join(', ') }</p>
                <p>Pythagorean transposition by word: { this.props.submission.pythTransposByWord.join(', ') }</p>
            </div>

            
                
                
            
        )
    }

    /*
    determineMinCols = (wordArr) => {
        let longestWordLength = wordArr[0].length;
        wordArr.forEach( (word) => {
            longestWordLength = ( word.length > longestWordLength ) ? word.length : longestWordLength;
        } );
        return longestWordLength;
    }

    fillEmptyCols = (word, minCols) => {
        let colDifference = minCols-word.length;
        return colDifference
    }
    */

}

export default SubmissionItem;