import React, { Component } from 'react';
import Submissions from './components/Submissions';
import AddSubmission from './components/AddSubmission';
import './App.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const Essences = {
  'A': 1,'B': 2,'C': 3,
  'D': 4,'E': 5,'F': 6,
  'G': 7,'H': 8,'I': 9,
  'J': 1,'K': 2,'L': 3,
  'M': 4,'N': 5,'O': 6,
  'P': 7,'Q': 8,'R': 9,
  'S': 1,'T': 2,'U': 3,
  'V': 4,'W': 5,'X': 6,
  'Y': 7,'Z': 8
};

class App extends Component {

  /*
  EXAMPLE SUBMISSION

  submissions: [{
    phrase: "EXAMPLE PHRASE",
    words: ["EXAMPLE", "PHRASE"],
    normalTransposByLtr: [
      [5,24,1,13,16,12,5],
      [16,8,18,1,19,5]
    ],
    pythTransposByLtr: [
      [5,6,1,4,7,3,5],
      [7,8,9,1,1,5]
    ],
    normalTransposSumByWord: [76, 67],
    pythTransposSumByWord: [31, 31]
    normalSumTotal: 32,
    pythSumTotal: 14,
    essenceByWord: [4, 4]
    phraseEssence: 5
  }]
  */

  state = {
    submissions: []
  };

  render() {
    return (
      <div className="App">
        <AddSubmission addSubmission={this.addSubmission} />
        <Submissions submissions={this.state.submissions} />
      </div>
    );
  }

  addSubmission = (phrase) => {
    let Submission = {}
    
    Submission.phrase = phrase;
    Submission.words = phrase.split(' ');
    
    Submission.normalTransposByLtr = this.calcTransposByLtr( Submission.words );
    Submission.pythTransposByLtr = this.calcTransposByLtr( Submission.words, true );
    
    // both of these reduce nested arrays to sum
    Submission.normalSumTotal = this.calcSumTotal(Submission.normalTransposByLtr);
    Submission.pythSumTotal = this.calcSumTotal(Submission.pythTransposByLtr);

    Submission.normalTransposSumByWord = this.calcTransposSumByWord(Submission.normalTransposByLtr);
    // true for pyth transposition
    Submission.pythTransposSumByWord = this.calcTransposSumByWord(Submission.pythTransposByLtr);

    /* doesm't matter whether normal or pythTransposSumByWord is used
    since they will always equal */
    Submission.essenceByWord = Submission.pythTransposSumByWord.map(sum => this.calcEssence(sum));

    /* doesn't matter whether pythSumTotal or normalSumTotal is used
    since they will always equal */
    Submission.phraseEssence = this.calcEssence(Submission.pythSumTotal);

    this.setState({ submissions: [...this.state.submissions, Submission] }, function(){
      console.log(this.state);
    });
  }

  calcTransposByLtr = (wordArr, isPyth = false) => {
    let transposByLtrArr = [];
    wordArr.forEach((word, wordIndex)=>{
      // build nested array
      transposByLtrArr.push([]);

      for(let i = 0; i < word.length; i++){
        let ltr = word[i];
        let ltrNum = (isPyth) ? Essences[ltr] : alphabet.indexOf(ltr) + 1;
        transposByLtrArr[wordIndex].push( ltrNum );
      }
    });
    return transposByLtrArr;
  }

  calcTransposSumByWord = (transposByLtrArr, isPyth=false) => {
    let wordSums = [];
    
    transposByLtrArr.forEach((wordArr, i)=>{
      wordSums.push(
        wordArr.reduce((curr, next)=>{
          return (isPyth) ? this.calcEssence(curr + next) : curr + next;
        })
      );
    });

    return wordSums;
  }

  calcSumTotal = (transposByLtrArr, isPyth = false) => {
    let sum = 0;
    transposByLtrArr.forEach((wordArr)=>{
      sum += wordArr.reduce((currLtrVal, nextLtrVal)=>{
        return currLtrVal + nextLtrVal;
      })
    });
    return sum;
  }

  calcEssence = (num) => {
    while(num > 9){
      let numDigitsArr = (""+num).split('').map(Number);
      num = numDigitsArr.reduce((curr, next)=>{
        return curr + next;
      });
    }
    return num;
  }



}

export default App;
