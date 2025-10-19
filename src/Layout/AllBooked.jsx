import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const DateAvailabilityMessage = ({ checkIn, checkOut, onClearDates }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg max-w-2xl mx-auto my-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="bg-orange-100 rounded-full p-3">
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Properties Available for Selected Dates
          </h3>
          
          <div className="bg-white rounded-lg p-4 mb-4 border border-orange-100">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <span className="font-semibold">Your Selected Dates:</span>
            </div>
            <div className="text-gray-600 ml-7">
              <span className="font-medium">{formatDate(checkIn)}</span>
              <span className="mx-2">→</span>
              <span className="font-medium">{formatDate(checkOut)}</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">
            Unfortunately, all properties are booked or unavailable for these dates. 
            Please try:
          </p>
          
          <ul className="space-y-2 mb-4 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>Selecting different dates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>Reducing your stay duration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span>Browsing all properties without date filters</span>
            </li>
          </ul>
          
          <button
            onClick={onClearDates}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Clear Dates & View All Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateAvailabilityMessage;