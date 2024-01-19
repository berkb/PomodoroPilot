import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [history, setHistory] = useState([]);
  const [showReset, setShowReset] = useState(false);
  const [showCustomInputs, setShowCustomInputs] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerName, setTimerName] = useState('Pomodoro Pilot');
  const [showHistory, setShowHistory] = useState(false);

  const addToHistory = (title, time) => {
    setHistory([...history, { title, time }]);
  };

  const startTimer = (time, title) => {
    setMinutes(time);
    setSeconds(0);
    setIsActive(true);
    setTaskTitle(title);
    setShowReset(true);
    setShowCustomInputs(false);
    setIsPaused(false);
  };

  const pauseResumeTimer = () => {
    setIsPaused((prev) => !prev);
  };

  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setShowReset(false);
    setShowCustomInputs(false);
    setIsPaused(false);
    setTimerName('Pomodoro Pilot');
  };

  const handleButtonClick = (time, title) => {
    startTimer(time, title);
    addToHistory(title, `${String(time).padStart(2, '0')}:00`);
    setTimerName(title);
  };

  const handleCustomTimeChange = (event) => {
    setCustomTime(event.target.value);
  };

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const startCustomTimer = () => {
    setShowCustomInputs(true);
    setShowReset(false);
    hideTimerButtons();
  };

  const confirmCustomTimer = () => {
    const customValue = parseInt(customTime, 10);

    if (!isNaN(customValue) && customValue > 0) {
      setMinutes(customValue);
      setSeconds(0);
      setIsActive(true);
      addToHistory(taskTitle || 'Custom', `${String(customValue).padStart(2, '0')}:00`);
      setShowReset(true);
      setShowCustomInputs(false);
      setIsPaused(false);
      showTimerButtons();
      setTimerName(taskTitle || 'Custom');
    } else {
      console.error('Invalid custom time input');
    }
  };

  const hideTimerButtons = () => {
    const timerButtons = document.querySelector('.timer-buttons');
    if (timerButtons) {
      timerButtons.style.display = 'none';
    }
  };

  const showTimerButtons = () => {
    const timerButtons = document.querySelector('.timer-buttons');
    if (timerButtons) {
      timerButtons.style.display = 'grid';
    }
  };

  useEffect(() => {
    let interval;

    const updateTimer = () => {
      if (!isPaused) {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            addToHistory(taskTitle, '00:00');
            setShowReset(true);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    };

    if (isActive) {
      interval = setInterval(updateTimer, 1000);
    } else {
      clearInterval(interval);
    }

    document.title = `${timerName} - ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, minutes, seconds, taskTitle, addToHistory, timerName]);

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <div className="pomodoro-timer select-none bg-black/20 backdrop-blur-md px-[5px] py-[5px] mb-[25px] sm:mb-0 rounded-[17px]">
      <h1>{timerName}</h1>
      <p>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <div className="timer-functions">
        <div className="line-style timer-buttons">
          {showReset ? (
            <>
              <button onClick={pauseResumeTimer}>{isPaused ? 'Resume' : 'Pause'}</button>
              <button onClick={resetTimer}>Reset</button>
            </>
          ) : (
            <>
              <button onClick={() => handleButtonClick(25, 'Pomodoro')}>Pomodoro</button>
              <button onClick={startCustomTimer}>Custom</button>
              <button onClick={() => handleButtonClick(5, 'Short Break')}>Short Break</button>
              <button onClick={() => handleButtonClick(15, 'Long Break')}>Long Break</button>
            </>
          )}
        </div>
        <div className="line-style">
          {showReset ? null : (
            <>
              {showCustomInputs && (
                <>
                  <input
                    type="text"
                    placeholder="Title"
                    value={taskTitle}
                    onChange={handleTaskTitleChange}
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Minutes"
                    value={customTime}
                    onChange={handleCustomTimeChange}
                  />
                  <button onClick={confirmCustomTimer}>Confirm</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="history">
        <h2 onClick={toggleHistory}>History</h2>
        {showHistory && (
          <ul>
            {history.slice(0).reverse().map((item, index) => (
              <li key={index}>{`${item.title} - ${item.time}`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
