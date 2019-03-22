import React, { Component } from 'react';

class SubmissionItem extends Component {
    render(){
        return(

            <div>
                <span className="label">phrase:</span>
                <p style={{marginTop: '0', marginBottom: '1.5rem'}}>{ this.props.submission.phrase }</p>

                <span className="label">essence of phrase:</span>
                <p style={{marginTop: '0', marginBottom: '1.5rem'}}>{ this.props.submission.phraseEssence }</p>

                <table>
                    <tbody>
                    { this.props.submission.words.map((word, wordIndex)=>(
                        <React.Fragment>
                            <tr>
                                {this.buildRow(
                                    this.minCols, 
                                    word.split(""), 
                                    true, 
                                    null, 
                                    [<th>Sum</th>,
                                    <th>Essence</th>]
                                )}
                            </tr>
                            <tr>
                                {this.buildRow(
                                    this.minCols, 
                                    this.props.submission.normalTransposByLtr[wordIndex],
                                    false,
                                    null,
                                    [<td>{this.props.submission.normalTransposSumByWord[wordIndex]}</td>,
                                    <td>{this.props.submission.essenceByWord[wordIndex]}</td>]
                                )}
                            </tr>
                            <tr>
                                {this.buildRow(
                                    this.minCols, 
                                    this.props.submission.pythTransposByLtr[wordIndex],
                                    false,
                                    null,
                                    [<td>{this.props.submission.pythTransposSumByWord[wordIndex]}</td>,
                                    <td>{this.props.submission.essenceByWord[wordIndex]}</td>]
                                )}
                            </tr>
                        </React.Fragment>
                    )) }
                    </tbody>
                </table>

                <span className="label" style={{marginTop: "1.5rem"}}>sum of standard alphabet values</span>
                <p style={{marginTop: '0', marginBottom: '1.5rem'}}>{ this.props.submission.normalSumTotal }</p>
                <span className="label">sum of pythagorean alphabet values</span>
                <p style={{marginTop: '0'}}>{ this.props.submission.pythSumTotal }</p>
            </div>
        )
    }

    minCols = ((wordArr) => {
        let longestWordLength = wordArr[0].length;
        wordArr.forEach( (word) => {
            longestWordLength = ( word.length > longestWordLength ) ? word.length : longestWordLength;
        } );
        return longestWordLength;
    })(this.props.submission.words);

    buildRow = (minCols, outputArr, isHeading = false, beforeElemArr, afterElemArr) => {
        let row = [];

        // elements to display before main output
        if(beforeElemArr){
            beforeElemArr.forEach((elem)=>{
                row.push(elem);
            });
        }

        for(let i = 0; i < minCols; i++){
            if(isHeading){
                row.push( (outputArr[i] != undefined) ? <th> {outputArr[i]} </th> : <th></th> );
            }else{
                row.push( (outputArr[i] != undefined) ? <td> {outputArr[i]} </td> : <td></td> );
            }
        }

        // elements to display after main output
        if(afterElemArr){
            afterElemArr.forEach((elem)=>{
                row.push(elem);
            });
        }

        return row;
    }

}

export default SubmissionItem;