import { WordManager } from "./WordManager.js";
import { ScoreManager } from "./ScoreManager.js";
import { Timer } from "./Timer.js";

export class TypingPracticeApp {
  constructor() {
    this.wordManager = new WordManager(["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"]);
    this.scoreManager = new ScoreManager();
    this.timer = new Timer(3.0, this.onTimeUp.bind(this));
    this.currentWord = "";

    this.initUI();
  }

  initUI() {
    this.timeIntervalDisplay = document.getElementById("time-interval");
    this.successfulAttemptsDisplay = document.getElementById("successful-attempts");
    this.totalAttemptsDisplay = document.getElementById("total-attempts");
    this.startBtn = document.getElementById("start-btn");
    this.stopBtn = document.getElementById("stop-btn");
    this.promptWordDisplay = document.getElementById("prompt-word");
    this.userInput = document.getElementById("user-input");
    this.feedbackMessage = document.getElementById("feedback-message");

    this.startBtn.addEventListener("click", this.startPractice.bind(this));
    this.stopBtn.addEventListener("click", this.stopPractice.bind(this));
    this.userInput.addEventListener("input", this.handleInput.bind(this));
  }

  startPractice() {
    this.timer.interval = 3.0;
    this.scoreManager.reset();
    this.updateScore();
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;
    this.userInput.disabled = false;
    this.userInput.value = "";
    this.feedbackMessage.textContent = "";
    this.displayNewWord();
    this.timer.start();
  }

  stopPractice() {
    this.timer.stop();
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.userInput.disabled = true;
    this.promptWordDisplay.textContent = "Practice stopped.";
  }

  displayNewWord() {
    this.currentWord = this.wordManager.getRandomWord();
    this.promptWordDisplay.textContent = this.currentWord;
  }

  onTimeUp() {
    this.scoreManager.incrementTotal();
    this.updateScore();
    this.feedbackMessage.textContent = "Time's up! Try the next word.";
    this.displayNewWord();
  }

  handleInput() {
    const userTyped = this.userInput.value;
    if (userTyped === this.currentWord) {
      this.scoreManager.incrementSuccess();
      this.scoreManager.incrementTotal();
      this.feedbackMessage.textContent = "Correct! Well done!";
      this.timer.adjustInterval(-0.1);
      this.timeIntervalDisplay.textContent = this.timer.interval.toFixed(2);
      this.updateScore();
      this.displayNewWord();
      this.userInput.value = "";
      this.timer.start();
    } else if (this.currentWord.startsWith(userTyped)) {
      this.feedbackMessage.textContent = "Keep going...";
    } else {
      this.scoreManager.incrementTotal();
      this.feedbackMessage.textContent = "Incorrect! Try again.";
      this.userInput.value = "";
      this.updateScore();
    }
  }

  updateScore() {
    this.successfulAttemptsDisplay.textContent = this.scoreManager.successfulAttempts;
    this.totalAttemptsDisplay.textContent = this.scoreManager.totalAttempts;
  }
}
