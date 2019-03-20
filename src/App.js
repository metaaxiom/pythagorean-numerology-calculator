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
  state = {
    submissions: [
      {
        X phrase: null,
        X words: [],
        X normalTransposByLtr: [1,2,3,0,1,2,3],
        X pythTransposByLtr: [1,2,3,0,1,2,3],
        normalTransposByWord: [1,2,3,4,5,6],
        pythTransposByWord: [1,2,3,4,5,6]
        X normalSumTotal: null,
        X pythSumTotal: null,
        X essence: null
      }
    ]
  };
  */

  /*
  0 represents space
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
    Submission.normalSumTotal = Submission.normalTransposByLtr.reduce(
      (curr, next) => {
        return curr + next[1];
      }, 0
    );
    Submission.pythSumTotal = Submission.pythTransposByLtr.reduce(
      (curr, next) => {
        return curr + next[1];
      }, 0
    );

    Submission.normalTransposByWord = this.calcTransposByWord(Submission.words);
    // true for pyth transposition
    Submission.pythTransposByWord = this.calcTransposByWord(Submission.words, true);

    /* doesn't matter whether pythSumTotal or normalSumTotal is used
    since they will always equal */
    Submission.essence = this.calcEssence(Submission.pythSumTotal);

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

  calcTransposByWord = (wordArr, isPyth = false) => {
    let transposByWordArr = [];
    wordArr.forEach((word)=>{
      // choose option for either normal or pythagorean transposition
      // calcTransposByLtr takes in an array
      let wordTransposFullNumArr = (isPyth) ? this.calcTransposByLtr([word], true) : this.calcTransposByLtr([word]);

      let wordTransposSum = wordTransposFullNumArr.reduce((curr, next)=>{

        return (isPyth) ? (this.calcEssence(curr + next[1])) : (curr + next[1]);
      }, 0);
      
      if(isPyth){
        transposByWordArr.push(this.calcEssence(wordTransposSum));
      }else{
        transposByWordArr.push(wordTransposSum);
      }
    });
    return transposByWordArr;
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
