import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  // State variables
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [history, setHistory] = useState([]);

  // Function to add an entry to the history
  const addToHistory = (title, time) => {
    setHistory([...history, { title, time }]);
  };

  // Function to start the timer
  const startTimer = () => {
    setIsActive(true);
    addToHistory(taskTitle || 'Pomodoro', `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
  };

  // Function to pause the timer
  const pauseTimer = () => {
    setIsActive(false);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
  };

  // Function to handle button clicks and set the timer accordingly
  const handleButtonClick = (time, title) => {
    setMinutes(time);
    setSeconds(0);
    setIsActive(false);
    setTaskTitle(title);
  };

  // Function to handle changes in custom time input
  const handleCustomTimeChange = (event) => {
    setCustomTime(event.target.value);
  };

  // Function to handle changes in task title input
  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  // Function to start a custom timer
  const startCustomTimer = () => {
    const customValue = parseInt(customTime, 10);

    if (!isNaN(customValue) && customValue > 0) {
      setMinutes(customValue);
      setSeconds(0);
      setIsActive(true);
      addToHistory(taskTitle || 'Custom', `${String(customValue).padStart(2, '0')}:00`);
    } else {
      console.error('Invalid custom time input');
    }
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: 'Your Pomodoro session is complete!',
        icon: 'path/to/your/icon.png', // İkon yolu
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    }
  };

  // Effect hook to handle the timer logic
  useEffect(() => {
    let interval;
  
    const updateTimer = () => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setIsActive(false);
          showNotification();
          addToHistory(taskTitle || 'Pomodoro', '00:00');
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
  
      // Update the title of the browser tab
      document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Pomodoro Pilot`;
    };
  
    // Set up the interval if the timer is active
    if (isActive) {
      interval = setInterval(updateTimer, 1000);
    } else {
      // Clear the interval if the timer is not active
      clearInterval(interval);
      // Reset the title of the browser tab when the timer completes
      document.title = 'Pomodoro Pilot';
    }
  
    // Cleanup function to clear the interval on component unmount or dependency changes
    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds, taskTitle, addToHistory, showNotification]);
  

  // Render the PomodoroTimer component
  return (
    <div className="pomodoro-timer">
      <p>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <div className="timer-functions">
        {/* Button row for standard timer durations */}
        <div className="line-style">
          <button onClick={() => handleButtonClick(25, 'Pomodoro')}>Pomodoro</button>
          <button onClick={() => handleButtonClick(5, 'Short Break')}>Short Break</button>
          <button onClick={() => handleButtonClick(15, 'Long Break')}>Long Break</button>
        </div>
        {/* Input row for custom timer */}
        <div className="line-style">
          <button onClick={() => handleButtonClick(0, 'Custom')}>Custom</button>
          {minutes === 0 && (
            <div>
              <input
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={handleTaskTitleChange}
              />
              <input
                type="number"
                min="1"
                placeholder="Enter custom time in minutes"
                value={customTime}
                onChange={handleCustomTimeChange}
              />
            </div>
          )}
        </div>
        {/* Button row for timer controls */}
        <div className="line-style">
          <button onClick={minutes === 0 ? startCustomTimer : startTimer} disabled={isActive}>
            Start
          </button>
          <button onClick={pauseTimer} disabled={!isActive}>
            Pause
          </button>
          <button onClick={resetTimer} disabled={isActive}>
            Reset
          </button>
        </div>
      </div>
      {/* History section to display completed sessions */}
      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{`${item.title} - ${item.time}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the PomodoroTimer component
export default PomodoroTimer;
