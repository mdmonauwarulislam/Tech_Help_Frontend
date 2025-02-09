const AvailabilityRow = ({ day }) => {
    return (
      <div className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-gray-800">{day}</span>
        </label>
        <div className="flex gap-4">
          <div>
            <label className="text-sm text-gray-600">Start time</label>
            <select
              className="block w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md text-gray-600"
              defaultValue="09:00 AM IST"
            >
              <option>09:00 AM IST</option>
              <option>10:00 AM IST</option>
              <option>11:00 AM IST</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">End time</label>
            <select
              className="block w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded-md text-gray-600"
              defaultValue="06:00 PM IST"
            >
              <option>06:00 PM IST</option>
              <option>07:00 PM IST</option>
              <option>08:00 PM IST</option>
            </select>
          </div>
          <button className="text-blue-500 text-lg font-bold">+</button>
        </div>
      </div>
    );
  };
  
  export default AvailabilityRow;
  