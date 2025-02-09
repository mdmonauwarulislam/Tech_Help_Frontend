const Calendar = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <select className="text-gray-800 bg-gray-100 px-3 py-2 rounded-md">
            <option>2025</option>
            <option>2024</option>
          </select>
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:text-gray-700">{"<"}</button>
            <button className="text-gray-500 hover:text-gray-700">{">"}</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <span key={day} className="font-medium text-gray-600">
              {day}
            </span>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-full ${
                i === 18
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Calendar;
  