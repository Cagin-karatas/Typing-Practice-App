export class WordManager {
    constructor(wordList) {
      this.wordList = wordList;
    }
  
    getRandomWord() {
      return this.wordList[Math.floor(Math.random() * this.wordList.length)];
    }
  }
  