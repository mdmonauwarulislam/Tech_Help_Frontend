const Filters = () => {
    return (
      <div className="flex gap-4">
        {/* Date Filter */}
        <select
          className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 border border-gray-300 focus:ring-primary focus:border-primary"
          defaultValue="Filter by: Date"
        >
          <option>Filter by: Date</option>
          <option>Today</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
  
        {/* Services Filter */}
        <select
          className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 border border-gray-300 focus:ring-primary focus:border-primary"
          defaultValue="Services"
        >
          <option>Services</option>
          <option>1:1 Call</option>
          <option>Queries</option>
          <option>Resources</option>
        </select>
      </div>
    );
  };
  
  export default Filters;
  