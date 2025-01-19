export class ScoreManager {
    constructor() {
      this.successfulAttempts = 0;
      this.totalAttempts = 0;
    }
  
    incrementSuccess() {
      this.successfulAttempts++;
    }
  
    incrementTotal() {
      this.totalAttempts++;
    }
  
    getSuccessRate() {
      return this.totalAttempts > 0
        ? ((this.successfulAttempts / this.totalAttempts) * 100).toFixed(2)
        : "0.00";
    }
  
    reset() {
      this.successfulAttempts = 0;
      this.totalAttempts = 0;
    }
  }
  