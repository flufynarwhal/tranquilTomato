class PomodoroTimer {
    constructor() {
        this.timerDisplay = document.getElementById('timer-display');
        this.startButton = document.getElementById('start-button');
        this.resetButton = document.getElementById('reset-button');
        this.intervalId = null;
        this.workDuration = 25 * 60; // Corrected to 25 minutes in seconds
        this.shortBreakDuration = 5 * 60;
        this.longBreakDuration = 15 * 60;
        this.currentDuration = this.workDuration;
        this.isWorkPeriod = true;
        this.isRunning = false;
        this.workCounter = 0;

        this.init();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateTimer() {
        this.timerDisplay.textContent = this.formatTime(this.currentDuration);
    }

    updateStartButton() {
        if (this.isRunning) {
            if (this.isWorkPeriod) {
                this.startButton.textContent = 'Pause Work';
            } else if (this.workCounter >= 4) {
                this.startButton.textContent = 'Pause Long Break';
            } else {
                this.startButton.textContent = 'Pause Short Break';
            }
        } else {
            if (this.isWorkPeriod) {
                this.startButton.textContent = 'Start Work';
            } else if (this.workCounter >= 4) {
                this.startButton.textContent = 'Start Long Break';
            } else {
                this.startButton.textContent = 'Start Short Break';
            }
        }
    }

    toggleTimer() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
            this.startButton.removeAttribute('disabled');
        } else {
            this.startTimer();
        }
        this.updateStartButton();
    }

    decreaseTimer() {
        this.currentDuration--;
        this.updateTimer();
    }

    handleTimeRunOut() {
        this.isRunning = false;
        clearInterval(this.intervalId);

        // Using alert for simplicity, but you might replace with a better notification in the future.
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

    startTimer() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.decreaseTimer();

            if (this.currentDuration <= 0) {
                this.handleTimeRunOut();
            }
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.currentDuration = this.workDuration;
        this.isWorkPeriod = true;
        this.workCounter = 0;
        this.updateTimer();
        this.updateStartButton();
        this.startButton.removeAttribute('disabled');
    }

    init() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());

        this.updateTimer();
        this.updateStartButton();
    }
}

// Instantiate the PomodoroTimer class to set up the timer on the page.
const pomodoroTimer = new PomodoroTimer();
