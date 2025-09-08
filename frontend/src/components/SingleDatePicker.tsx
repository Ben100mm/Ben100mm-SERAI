'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface SingleDatePickerProps {
  selectedDate?: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export default function SingleDatePicker({
  selectedDate,
  onDateChange,
  placeholder = "Add date",
  className = ""
}: SingleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const resetDate = () => {
    onDateChange(null);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.getTime() === selectedDate.getTime();
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    onDateChange(date);
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Input Display */}
      <div 
        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow min-w-[300px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Calendar Icon */}
        <div className="px-4 py-3">
          <Calendar className="h-5 w-5 text-gray-500" />
        </div>

        {/* Date Display */}
        <div className="flex-1 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">
              {selectedDate ? formatDate(selectedDate) : placeholder}
            </div>
            {selectedDate && (
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDateChange(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000));
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDateChange(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-6 min-w-[400px]">

          {/* Calendar Grid */}
          <div className="flex justify-center">
            <div className="w-80">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPreviousMonth}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                </button>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={goToNextMonth}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-8" />;
                  }

                  const isDisabled = isDateDisabled(date);
                  const isSelected = isDateSelected(date);

                  return (
                    <button
                      key={date.getTime()}
                      onClick={() => handleDateClick(date)}
                      disabled={isDisabled}
                      className={`
                        h-8 w-8 text-xs font-medium rounded-full transition-colors
                        ${isDisabled 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                        }
                        ${isSelected 
                          ? 'bg-serai-red-400 text-white hover:bg-serai-red-500' 
                          : ''
                        }
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={resetDate}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
            >
              Reset
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-serai-red-500 hover:bg-serai-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
