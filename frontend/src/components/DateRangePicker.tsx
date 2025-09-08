'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerProps {
  checkInDate?: Date | null;
  checkOutDate?: Date | null;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export default function DateRangePicker({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  placeholder = "Add dates",
  className = ""
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
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

  const isDateInRange = (date: Date) => {
    if (!checkInDate || !checkOutDate) return false;
    return date > checkInDate && date < checkOutDate;
  };

  const isDateSelected = (date: Date) => {
    if (checkInDate && date.getTime() === checkInDate.getTime()) return 'checkin';
    if (checkOutDate && date.getTime() === checkOutDate.getTime()) return 'checkout';
    return false;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Start new selection
      onCheckInChange(date);
      onCheckOutChange(null);
    } else if (checkInDate && !checkOutDate) {
      // Complete selection
      if (date > checkInDate) {
        onCheckOutChange(date);
      } else {
        onCheckInChange(date);
        onCheckOutChange(null);
      }
    }
  };

  const handleDateHover = (date: Date) => {
    if (checkInDate && !checkOutDate && !isDateDisabled(date)) {
      setHoveredDate(date);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const resetDates = () => {
    onCheckInChange(null);
    onCheckOutChange(null);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const getNextMonth = () => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  };

  const renderCalendar = (month: Date, isSecondMonth = false) => {
    const days = getDaysInMonth(month);
    
    return (
      <div className="w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">
            {monthNames[month.getMonth()]} {month.getFullYear()}
          </h3>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-8" />;
            }

            const isDisabled = isDateDisabled(date);
            const selectedType = isDateSelected(date);
            const inRange = isDateInRange(date);
            const isHovered = hoveredDate && date.getTime() === hoveredDate.getTime();
            const isInHoverRange = checkInDate && hoveredDate && !checkOutDate && 
              date > checkInDate && date < hoveredDate;

            return (
              <button
                key={date.getTime()}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => handleDateHover(date)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isDisabled}
                className={`
                  h-8 w-8 text-xs font-medium rounded-full transition-colors relative
                  ${isDisabled 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                  }
                  ${selectedType === 'checkin' 
                    ? 'bg-serai-red-400 text-white hover:bg-serai-red-500' 
                    : selectedType === 'checkout'
                    ? 'bg-gray-400 text-white hover:bg-gray-500'
                    : ''
                  }
                  ${inRange || isInHoverRange 
                    ? 'bg-serai-red-100 text-serai-red-700' 
                    : ''
                  }
                  ${isHovered && !selectedType 
                    ? 'bg-gray-200' 
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
    );
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Input Display */}
      <div 
        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow min-w-[500px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* From Date - includes calendar icon */}
        <div className="flex-1 px-4 py-3 border-r border-gray-300">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-3" />
            <div className="flex items-center justify-between flex-1">
              <div className="text-sm text-gray-700 font-medium">
                {checkInDate ? formatDate(checkInDate) : "From"}
              </div>
              {checkInDate && (
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCheckInChange(new Date(checkInDate.getTime() - 24 * 60 * 60 * 1000));
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCheckInChange(new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000));
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

        {/* To Date */}
        <div className="flex-1 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">
              {checkOutDate ? formatDate(checkOutDate) : "To"}
            </div>
            {checkOutDate && (
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckOutChange(new Date(checkOutDate.getTime() - 24 * 60 * 60 * 1000));
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckOutChange(new Date(checkOutDate.getTime() + 24 * 60 * 60 * 1000));
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
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-6 min-w-[700px]">

          {/* Calendar Grid */}
          <div className="flex space-x-8">
            {renderCalendar(currentMonth)}
            {renderCalendar(getNextMonth(), true)}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={resetDates}
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
