import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelector.css';

const DateSelector = ({ selectedDate, onDateChange, mode = 'month' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (date) => {
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString();
    
    setCurrentDate(date);
    onDateChange({ month, year });
  };

  const handleYearChange = (year) => {
    const currentMonth = currentDate.getMonth();
    const newDate = new Date(year, currentMonth, 1);
    
    setCurrentDate(newDate);
    onDateChange({ 
      month: months[currentMonth], 
      year: year.toString() 
    });
  };

  return (
    <div className="date-selector">
      <h3>Chọn thời gian</h3>
      <div className="date-options">
        {mode === 'month' && (
          <div className="date-option">
            <span>Tháng:</span>
            <div className="date-picker-container">
              <DatePicker
                selected={currentDate}
                onChange={handleMonthChange}
                dateFormat="MMMM"
                showMonthYearPicker
                showFullMonthYearPicker
                customInput={
                  <button className="date-picker-button">
                    <strong>{selectedDate.month}</strong>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                }
              />
            </div>
          </div>
        )}

        {(mode === 'month' || mode === 'year') && (
          <div className="date-option">
            <span>Năm:</span>
            <div className="year-selector">
              <select 
                value={selectedDate.year}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="year-select"
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 5 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
