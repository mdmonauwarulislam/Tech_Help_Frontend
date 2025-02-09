const TimezoneSelector = () => {
    return (
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-800">Switch timezone</label>
        <select
          className="bg-gray-100 border border-gray-300 text-gray-600 px-3 py-2 rounded-md"
          defaultValue="Asia/Kolkata IST (+05:30)"
        >
          <option>Asia/Kolkata IST (+05:30)</option>
          <option>GMT (+00:00)</option>
          <option>EST (-05:00)</option>
          <option>PST (-08:00)</option>
        </select>
      </div>
    );
  };
  
  export default TimezoneSelector;
  