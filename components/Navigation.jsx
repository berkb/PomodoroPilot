// components/Navigation.js
import { useState } from 'react';

const Navigation = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="navigation-container">
      <h2>Pomodoro Pilot</h2>
      
      <ul className="tab-list">
        {tabs.map((tab, index) => (
          <li key={index} onClick={() => handleTabClick(index)} className={`tab-item ${index === activeTab ? 'active' : ''}`}>
            {tab.label}
          </li>
        ))}
      </ul>
      
      <div className="content-container">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Navigation;
