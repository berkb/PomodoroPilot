// WelcomeMessage.js

import React from 'react';

const WelcomeMessage = () => {
    return (
        <div className="welcome-container select-none bg-black/20 backdrop-blur-md px-[5px] py-[5px] mb-[25px] rounded-[17px]">
            <h2 className="welcome-heading">Welcome to PomodoroPilot!</h2>
            <p className="welcome-text">Are you ready to boost your productivity with the Pomodoro technique?</p>
        </div>
    );
};

export default WelcomeMessage;
