/**
 * Class representing a Pomodoro timer.
 */
class PomodoroTimer {

	/**
	 * Constructor: Initializes the Pomodoro timer.
	 */
	constructor() {
		// DOM references
		this.timerDisplay = document.getElementById('timer-display');
		this.startButton = document.getElementById('start-button');
		this.resetButton = document.getElementById('reset-button');

		// Timer intervals and state
		this.intervalId = null;
		this.workDuration = 25 * 60; // 25 minutes in seconds
		this.shortBreakDuration = 5 * 60; // 5 minutes in seconds
		this.longBreakDuration = 15 * 60; // 15 minutes in seconds
		this.currentDuration = this.workDuration;

		// State flags
		this.isWorkPeriod = true;
		this.isRunning = false;
		this.workCounter = 0;

		// Sound setup
		this.bellSound = new Audio('assets/sounds/deep.mp3'); // Preload the bell sound

		// Initialization
		this.init();
	}

	/**
	 * Convert seconds into a MM:SS format.
	 * @param {number} seconds - The number of seconds.
	 * @return {string} Formatted time.
	 */
	formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	/**
	 * Update the visual timer display.
	 */
	updateTimer() {
		this.timerDisplay.textContent = this.formatTime(this.currentDuration);
	}

	/**
	 * Adjusts the start button label based on the timer's current state.
	 */
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

    /**
     * Toggle between starting and pausing the timer.
     */
    toggleTimer() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
            this.startButton.removeAttribute('disabled');
        } else {
            this.playSound(); // Play sound when starting the timer
            this.startTimer();
        }
        this.updateStartButton();
    }   

	/**
	 * Decreases the timer's duration every second.
	 */
	decreaseTimer() {
		this.currentDuration--;
		this.updateTimer();
	}

	/**
	 * Play a sound effect for transitions.
	 */
	playSound() {
		this.bellSound.currentTime = 0; // reset the sound to start from the beginning
		this.bellSound.play();
	}

	/**
	 * Logic to handle when the timer runs out, switching between work and break periods.
	 */
	handleTimeRunOut() {
		this.isRunning = false;
		clearInterval(this.intervalId);

		this.playSound(); // play the bell sound

		let modal = document.getElementById('transition-modal');
		let message = document.getElementById('transition-message');

		if (this.isWorkPeriod) {
			this.workCounter++;
			if (this.workCounter >= 4) {
				message.textContent = 'Time for a long break!';
				this.currentDuration = this.longBreakDuration;
				this.workCounter = 0;
			} else {
				message.textContent = 'Time for a short break!';
				this.currentDuration = this.shortBreakDuration;
			}
		} else {
			message.textContent = 'Back to work!';
			this.currentDuration = this.workDuration;
		}

		// Show the modal
		modal.style.display = 'block';

		this.isWorkPeriod = !this.isWorkPeriod;
		this.updateTimer();
		this.updateStartButton();
		this.startButton.removeAttribute('disabled');
	}

	/**
	 * Close the transition modal.
	 */
	closeModal() {
		document.getElementById('transition-modal').style.display = 'none';
	}

	/**
	 * Start the countdown timer.
	 */
    startTimer() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.decreaseTimer();

            if (this.currentDuration <= 0) {
                this.handleTimeRunOut();
            }
        }, 1000);
    }

	/**
	 * Reset the timer to its default state.
	 */
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

	/**
	 * Setup event listeners and display the initial timer.
	 */
	init() {
		this.startButton.addEventListener('click', this.toggleTimer.bind(this));
		this.resetButton.addEventListener('click', this.resetTimer.bind(this));
		document.querySelector('.modal-close').addEventListener('click', this.closeModal.bind(this)); // Listen for close click

		this.updateTimer();
	}
}

// Initialize the Pomodoro timer upon page load.
const pomodoroTimer = new PomodoroTimer();