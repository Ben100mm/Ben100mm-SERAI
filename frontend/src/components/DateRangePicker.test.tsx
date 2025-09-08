import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateRangePicker from './DateRangePicker';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  ChevronLeft: () => <div data-testid="chevron-left">←</div>,
  ChevronRight: () => <div data-testid="chevron-right">→</div>,
}));

describe('DateRangePicker', () => {
  const mockOnCheckInChange = jest.fn();
  const mockOnCheckOutChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder text when no dates are selected', () => {
    render(
      <DateRangePicker
        checkInDate={null}
        checkOutDate={null}
        onCheckInChange={mockOnCheckInChange}
        onCheckOutChange={mockOnCheckOutChange}
        placeholder="Add dates"
      />
    );

    expect(screen.getByText('Add dates')).toBeInTheDocument();
    expect(screen.getByText('Check in')).toBeInTheDocument();
    expect(screen.getByText('Check out')).toBeInTheDocument();
  });

  it('displays selected dates correctly', () => {
    const checkInDate = new Date('2024-09-17');
    const checkOutDate = new Date('2024-10-16');

    render(
      <DateRangePicker
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onCheckInChange={mockOnCheckInChange}
        onCheckOutChange={mockOnCheckOutChange}
        placeholder="Add dates"
      />
    );

    expect(screen.getByText('Tue, Sep 17')).toBeInTheDocument();
    expect(screen.getByText('Wed, Oct 16')).toBeInTheDocument();
  });

  it('opens calendar dropdown when calendar button is clicked', () => {
    render(
      <DateRangePicker
        checkInDate={null}
        checkOutDate={null}
        onCheckInChange={mockOnCheckInChange}
        onCheckOutChange={mockOnCheckOutChange}
        placeholder="Add dates"
      />
    );

    const calendarButton = screen.getByTestId('calendar-icon').closest('button');
    fireEvent.click(calendarButton!);

    expect(screen.getByText('Round trip')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('calls onCheckInChange when a date is selected', () => {
    render(
      <DateRangePicker
        checkInDate={null}
        checkOutDate={null}
        onCheckInChange={mockOnCheckInChange}
        onCheckOutChange={mockOnCheckOutChange}
        placeholder="Add dates"
      />
    );

    // Open calendar
    const calendarButton = screen.getByTestId('calendar-icon').closest('button');
    fireEvent.click(calendarButton!);

    // Click on a date (assuming day 15 is available)
    const dateButton = screen.getByText('15');
    fireEvent.click(dateButton);

    expect(mockOnCheckInChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
