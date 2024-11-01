import  { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const JobFilter = () => {
  const [showJobType, setShowJobType] = useState(false);
  const [showJobMode, setShowJobMode] = useState(false);
  const [showJobFunctions, setShowJobFunctions] = useState(false);
  const [showExperienceLevel, setShowExperienceLevel] = useState(false);

  const jobTypes = [
    { name: "All", count: 50 },
    { name: "Full-time Job", count: 30 },
    { name: "Part-time", count: 15 },
    { name: "Internship", count: 5 },
  ];

  const jobModes = [
    { name: "Onsite", count: 20 },
    { name: "Remote", count: 25 },
    { name: "Hybrid", count: 15 },
  ];

  const jobFunctions = [
    { name: "Marketing", count: 10 },
    { name: "Engineering", count: 15 },
    { name: "Design", count: 12 },
    { name: "Customer Service", count: 8 },
    { name: "Support", count: 7 },
    { name: "Add", count: 0 },
  ];

  const experienceLevels = [
    { name: "Fresher/Entry Level", count: 20 },
    { name: "Junior", count: 15 },
    { name: "Mid-level", count: 10 },
    { name: "Senior", count: 5 },
    { name: "Lead/Managerial", count: 3 },
    { name: "Director/Executive", count: 2 },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md bg-gray-50">
      

      {/* Salary Range */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Salary Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded-md py-2 px-3"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
      </div>

      {/* Job Type */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowJobType(!showJobType)}
        >
          <h3 className="text-lg font-medium">Job Type</h3>
          {showJobType ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        {showJobType && (
          <div className="mt-2 space-y-1">
            {jobTypes.map((type) => (
              <div key={type.name} className="flex items-center">
                <input type="checkbox" id={type.name} />
                <label htmlFor={type.name} className="ml-2">
                  {type.name} ({type.count})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* Job Mode */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowJobMode(!showJobMode)}
        >
          <h3 className="text-lg font-medium">Job Mode</h3>
          {showJobMode ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        {showJobMode && (
          <div className="mt-2 space-y-1">
            {jobModes.map((mode) => (
              <div key={mode.name} className="flex items-center">
                <input type="checkbox" id={mode.name} />
                <label htmlFor={mode.name} className="ml-2">
                  {mode.name} ({mode.count})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* Job Functions */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowJobFunctions(!showJobFunctions)}
        >
          <h3 className="text-lg font-medium">Job Functions</h3>
          {showJobFunctions ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        {showJobFunctions && (
          <div className="mt-2 space-y-1">
            {jobFunctions.map((func) => (
              <div key={func.name} className="flex items-center">
                <input type="checkbox" id={func.name} />
                <label htmlFor={func.name} className="ml-2">
                  {func.name} ({func.count})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* Experience Level */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowExperienceLevel(!showExperienceLevel)}
        >
          <h3 className="text-lg font-medium">Experience Level</h3>
          {showExperienceLevel ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        {showExperienceLevel && (
          <div className="mt-2 space-y-1">
            {experienceLevels.map((level) => (
              <div key={level.name} className="flex items-center">
                <input type="checkbox" id={level.name} />
                <label htmlFor={level.name} className="ml-2">
                  {level.name} ({level.count})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFilter;
