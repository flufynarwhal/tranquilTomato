class PomodoroTimer {
    /**
     * Constructor for the PomodoroTimer class.
     * Initializes the timer properties and sets up event listeners.
     */
    constructor() {
      this.timerDisplay = document.getElementById('timer-display');
      this.startButton = document.getElementById('start-button');
      this.resetButton = document.getElementById('reset-button');
      this.intervalId = null;
      this.workDuration = 25 * 60; // 25 minutes in seconds
      this.shortBreakDuration = 5 * 60; // 5 minutes in seconds
      this.longBreakDuration = 15 * 60; // 15 minutes in seconds
      this.currentDuration = this.workDuration;
      this.isWorkPeriod = true;
      this.isRunning = false;
      this.workCounter = 0;
  
      this.init();
    }
  
    /**
     * Formats the time in seconds to a string in the format "mm:ss".
     * @param {number} seconds - The time duration in seconds.
     * @returns {string} - The formatted time string "mm:ss".
     */
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  
    /**
     * Updates the timer display with the current time.
     */
    updateTimer() {
      this.timerDisplay.textContent = this.formatTime(this.currentDuration);
    }
  
    /**
     * Updates the start button text based on the current period (work, short break, or long break).
     */
    updateStartButton() {
      if (this.isWorkPeriod) {
        if (this.workCounter >= 4) {
          this.startButton.textContent = 'Start Long Break';
        } else {
          this.startButton.textContent = 'Start Short Break';
        }
      } else {
        this.startButton.textContent = 'Start Work';
      }
    }
  
    /**
     * Toggles the timer on or off based on the current state.
     */
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.startButton.removeAttribute('disabled');
      } else {
        this.startTimer();
        this.startButton.setAttribute('disabled', 'true');
      }
    }
  
    /**
     * Starts the timer countdown.
     */
    startTimer() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
          this.currentDuration--;
          this.updateTimer();
  
          if (this.currentDuration <= 0) {
            clearInterval(this.intervalId);
            this.isRunning = false;
  
            if (this.isWorkPeriod) {
              this.workCounter++;
              if (this.workCounter >= 4) {
                alert('Time for a long break!');
                this.currentDuration = this.longBreakDuration;
                this.workCounter = 0;
              } else {
                alert('Time for a short break!');
                this.currentDuration = this.shortBreakDuration;
              }
            } else {
              alert('Back to work!');
              this.currentDuration = this.workDuration;
            }
  
            this.isWorkPeriod = !this.isWorkPeriod;
            this.updateTimer();
            this.updateStartButton();
            this.startButton.removeAttribute('disabled');
          }
        }, 1000);
      }
    }
  
    /**
     * Resets the timer to the initial work period and state.
     */
    resetTimer() {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.currentDuration = this.workDuration;
      this.isWorkPeriod = true;
      this.workCounter = 0;
      this.updateStartButton();
      this.updateTimer();
      this.startButton.removeAttribute('disabled');
    }
  
    /**
     * Initializes the timer by adding event listeners and updating the display.
     */
    init() {
      this.startButton.addEventListener('click', this.toggleTimer.bind(this));
      this.resetButton.addEventListener('click', this.resetTimer.bind(this));
  
      this.updateTimer();
    }
  }
  
  // Instantiate the PomodoroTimer class to set up the timer on the page.
  const pomodoroTimer = new PomodoroTimer();
  