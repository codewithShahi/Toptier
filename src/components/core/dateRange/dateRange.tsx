'use client';
import { useState, useRef, useEffect } from 'react';
import { addDays, format } from 'date-fns';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useDirection from '@hooks/useDirection';

interface CustomDateRangePickerProps {
  onChange: (range: { startDate: Date; endDate: Date }) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export default function CustomDateRangePicker({
  onChange,
  initialStartDate = new Date(),
  initialEndDate = addDays(new Date(), 7),
}: CustomDateRangePickerProps) {
  const [state, setState] = useState<Range[]>([
    {
      startDate: initialStartDate,
      endDate: initialEndDate,
      key: 'selection',
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false); // Track if user is selecting end date
  const pickerRef = useRef<HTMLDivElement>(null);
  const [direction] = useDirection();

  const handleSelect = (ranges: RangeKeyDict) => {
    const newRange = ranges.selection as Range;
    setState([newRange]);

    if (newRange.startDate && newRange.endDate) {
      onChange({
        startDate: newRange.startDate,
        endDate: newRange.endDate,
      });


      if (isSelectingEndDate) {
        setIsOpen(false);
        setIsSelectingEndDate(false);
      }
    }


    if (!isSelectingEndDate && newRange.startDate) {
      setIsSelectingEndDate(true);
    }
  };

  const togglePicker = () => setIsOpen(!isOpen);
  const closePicker = () => setIsOpen(false);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        closePicker();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedRange = state[0];
  const formattedRange =
    selectedRange.startDate && selectedRange.endDate
      ? `${format(selectedRange.startDate, 'yyyy-MM-dd')} | ${format(selectedRange.endDate, 'yyyy-MM-dd')}`
      : 'Select Date Range';

  return (
    <div className={`relative w-full`} ref={pickerRef} dir={direction}>
      <button
        type="button"
        onClick={togglePicker}
        className="w-full border border-gray-200 rounded-xl px-4 py-2 cursor-pointer text-start focus:outline-none hover:border-gray-300 transition-colors"
      >
        {formattedRange}
      </button>

      {isOpen && (
        <div className={`absolute z-50 mt-2 bg-white rounded-xl shadow-lg w-auto left-0 overflow-hidden`}>
          <DateRangePicker
            onChange={handleSelect}
            ranges={state}
            months={2}
            direction="horizontal"
            showDateDisplay={false}
            showMonthAndYearPickers={true}
            rangeColors={['#1e3a8a']}
            staticRanges={[]}
            inputRanges={[]}
            minDate={new Date()} 
          />
        </div>
      )}
    </div>
  );
}