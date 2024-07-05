import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/solid';

const DatePickerCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateClick = (day) => {
        const selectedDateTime = new Date(currentYear, currentMonth, day).getTime();
        const today = new Date().setHours(0, 0, 0, 0);

        if (selectedDateTime >= today) {
            setSelectedDate(day);
        } else {
            console.log('Cannot select past dates.');
        }
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth;
            const isSelected = selectedDate === day;
            const isDisabled = new Date(currentYear, currentMonth, day).getTime() < new Date().setHours(0, 0, 0, 0);

            days.push(
                <div
                    key={day}
                    className={`w-12 h-12 flex items-center justify-center cursor-pointer 
                        ${isToday ? 'bg-blue-500 text-white' : isSelected ? 'bg-blue-200' : isDisabled ? 'text-gray-400 cursor-not-allowed' : ''}
                    `}
                    onClick={() => isDisabled ? null : handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;

        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <div className="relative p-4">
            <div className="flex justify-between items-center mb-1">
                <button
                    onClick={toggleCalendar}
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    <span className="mr-2">Choose Date</span>
                    <CalendarIcon className="w-6 h-6 text-gray-600" />
                </button>
                {showCalendar && (
                    <div className="absolute z-5 top-12 left-20">
                        <div className="shadow-lg bg-white p-2 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center">
                                <button
                                    disabled
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 opacity-50 cursor-not-allowed"
                                >
                                    <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                                </button>
                                <div className="text-lg font-semibold">
                                    {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </div>
                                <button
                                    onClick={handleNextMonth}
                                    className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200"
                                >
                                    <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                <div className="text-center text-gray-600">Sun</div>
                                <div className="text-center text-gray-600">Mon</div>
                                <div className="text-center text-gray-600">Tue</div>
                                <div className="text-center text-gray-600">Wed</div>
                                <div className="text-center text-gray-600">Thu</div>
                                <div className="text-center text-gray-600">Fri</div>
                                <div className="text-center text-gray-600">Sat</div>
                                {renderCalendar()}
                            </div>
                            <div className="mt-2">
                                {selectedDate && (
                                    <div className="bg-blue-100 p-1 rounded-md text-blue-800">
                                        Selected Date: {selectedDate}/{currentMonth + 1}/{currentYear}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-end p-2 bg-gray-100 border-t">
                                <button className="px-2 py-1 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-gray-200">
                                    Cancel
                                </button>
                                <button className="px-2 py-1 ml-2 text-sm text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-blue-700">
                                    Set Date
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatePickerCalendar;
