export class Timer {
    constructor(interval, callback) {
      this.interval = interval;
      this.callback = callback;
      this.timerId = null;
    }
  
    start() {
      this.stop();
      this.timerId = setInterval(this.callback, this.interval * 1000);
    }
  
    stop() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }
  
    adjustInterval(delta) {
      this.interval = Math.max(1.0, this.interval + delta);
    }
  }
  