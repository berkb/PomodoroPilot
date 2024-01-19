// components/Navigation.js
import { useState } from 'react';
import SocialShareButtons from '../pages/Home/SocialShareButtons/SocialShareButtons';

const Navigation = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const pageUrl = 'https://pomodoropilot.com';
  const pageTitle = 'Pomodoro Pilot';

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="navigation-container">
      <ul className="tab-list">
        {tabs.map((tab, index) => (
          <li key={index} onClick={() => handleTabClick(index)} className={`tab-item ${index === activeTab ? 'active' : ''}`}>
            {tab.label}
          </li>
        ))}
        <SocialShareButtons url={pageUrl} title={pageTitle} />
      </ul>
      
      <div className="content-container">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Navigation;
