import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

const JobFilter = ({ jobs, filters, onChange }) => {
  const [show, setShow] = useState({
    jobType: true,
    jobMode: true,
    jobFunctions: false,
    experienceLevel: false,
  });

  // Extract unique values and their counts from jobs
  const getCounts = (key) => {
    const counts = {};
    jobs.forEach((job) => {
      const value = job[key];
      if (value) counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  const getSkillCounts = () => {
    const counts = {};
    jobs.forEach((job) => {
      job.skills.forEach((skill) => {
        counts[skill] = (counts[skill] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  const handleChange = (category, value) => {
    onChange(category, value);
  };

  return (
    <div className="w-full max-w-md p-4 border rounded-lg shadow-md bg-gray-50">
      <FilterSection
        title="Job Type"
        category="jobTypes"
        isOpen={show.jobType}
        toggle={() => setShow((s) => ({ ...s, jobType: !s.jobType }))}
        options={getCounts("type")}
        selected={filters.jobTypes}
        onChange={handleChange}
      />
      <FilterSection
        title="Job Mode"
        category="jobModes"
        isOpen={show.jobMode}
        toggle={() => setShow((s) => ({ ...s, jobMode: !s.jobMode }))}
        options={getCounts("workmode")}
        selected={filters.jobModes}
        onChange={handleChange}
      />
      <FilterSection
        title="Functions"
        category="functions"
        isOpen={show.jobFunctions}
        toggle={() => setShow((s) => ({ ...s, jobFunctions: !s.jobFunctions }))}
        options={getSkillCounts()}
        selected={filters.functions}
        onChange={handleChange}
      />
      <FilterSection
        title="Experience"
        category="experienceLevels"
        isOpen={show.experienceLevel}
        toggle={() => setShow((s) => ({ ...s, experienceLevel: !s.experienceLevel }))}
        options={getCounts("experience")}
        selected={filters.experienceLevels}
        onChange={handleChange}
      />
    </div>
  );
};

const FilterSection = ({ title, category, isOpen, toggle, options, selected, onChange }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center cursor-pointer" onClick={toggle}>
      <h3 className="text-lg font-medium">{title}</h3>
      {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
    {isOpen && (
      <div className="mt-2 space-y-1">
        {options.map(({ name, count }) => (
          <div key={name} className="flex items-center">
            <input
              type="checkbox"
              id={`${category}-${name}`}
              checked={selected.includes(name)}
              onChange={() => onChange(category, name)}
            />
            <label htmlFor={`${category}-${name}`} className="ml-2">
              {name} ({count})
            </label>
          </div>
        ))}
      </div>
    )}
    <hr className="my-4" />
  </div>
);

export default JobFilter;
