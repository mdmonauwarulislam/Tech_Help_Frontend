const StatsCard = ({ title, value, icon, subtitle }) => {
    return (
      <div className="p-4 bg-white shadow border-2 rounded-lg flex items-center gap-4">
        <div className="text-4xl text-primary">{icon}</div>
        <div className="">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-xl font-medium text-blue-600">{value}</p>
          {subtitle && <p className="text-[10px] text-gray-500">{subtitle}</p>}
        </div>
      </div>
    );
  };
  
  export default StatsCard;
  