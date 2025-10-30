import React from 'react';
import CACCLTVChart from './CACCLTVChart';
import MRRGrowthChart from './MRRGrowthChart';
import MRRPercentageChart from './MRRPercentageChart';
import './ChartsSection.css';

const ChartsSection = ({ chartsData, viewMode = 'month' }) => {
  const isYear = viewMode === 'year';
  return (
    <div className="charts-section">
      {/* CAC & CLTV Chart */}
      <div className="chart-container">
        <h3>
          CAC & CLTV {isYear ? '(Past 5 Years)' : '(Past 12 Months)'}
        </h3>
        <CACCLTVChart data={chartsData.cacCltv} />
      </div>

      {/* MRR Growth Chart */}
      <div className="chart-container">
        <h3>
          MRR Growth {isYear ? '(Past 5 Years)' : '(Past 12 Months)'}
        </h3>
        <MRRGrowthChart data={chartsData.mrrGrowth} />
      </div>

      {/* MRR Growth Percentage Chart */}
      <div className="chart-container circular">
        <h3>MRR Growth (Percentage)</h3>
        <MRRPercentageChart data={chartsData.mrrPercentage} />
      </div>
    </div>
  );
};

export default ChartsSection;
