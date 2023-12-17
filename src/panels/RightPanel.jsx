import React from 'react';
import WelcomeCard from './WelcomeCard';
import MainTemperatureCard from './MainTemperatureCard';
import BonusInfoCard from './BonusInfoCard';
import ForecastCard from './ForecastCard';

function RightPanel() {
  return (
    <div>
      <WelcomeCard />
      <MainTemperatureCard />
      <ForecastCard />
      <BonusInfoCard />
    </div>
  );
};

export default RightPanel;
