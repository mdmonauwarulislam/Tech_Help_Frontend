const Tabs = ({ tabs, activeTab }) => {
    return (
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg border border-gray-300 font-semibold text-base ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default Tabs;
  