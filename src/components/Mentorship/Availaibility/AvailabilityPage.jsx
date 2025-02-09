import React from "react";
import TimezoneSelector from "./TimezoneSelector";
import AvailabilityRow from "./AvailabilityRow";
import Calendar from "./Calender";

const AvailabilityPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Availability</h1>
        <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:shadow">
          Settings
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <TimezoneSelector />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Save
            </button>
          </div>

          {/* Availability Rows */}
          <div className="space-y-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <AvailabilityRow key={day} day={day} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white p-4 shadow rounded-lg">
          <Calendar />
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Schedule for the day</h3>
            <p className="text-gray-600 mb-4">09:00 AM IST - 06:00 PM IST</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Schedule Override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;
