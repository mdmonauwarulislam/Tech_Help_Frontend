import { IoSearch } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import JobFilter from "../components/Job/JobFilter";
import JobCard from "../components/Job/JobCard";
import { toast } from "react-toastify";

function JobPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    jobTypes: [],
    jobModes: [],
    functions: [],
    experienceLevels: [],
  });

  const jobsPerPage = 6;

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobs/getjobs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setJobs(data.jobs);
      setFilteredJobs(data.jobs);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on filters and search
  useEffect(() => {
    let results = [...jobs];

    if (filters.jobTypes.length > 0) {
      results = results.filter((job) => filters.jobTypes.includes(job.type));
    }

    if (filters.jobModes.length > 0) {
      results = results.filter((job) =>
        filters.jobModes.includes(job.workmode)
      );
    }

    if (filters.functions.length > 0) {
      results = results.filter((job) =>
        filters.functions.some((skill) => job.skills.includes(skill))
      );
    }

    if (filters.experienceLevels.length > 0) {
      results = results.filter((job) =>
        filters.experienceLevels.includes(job.experience)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((job) =>
        (job.title?.toLowerCase?.().includes(q) ?? false) ||
        (job.location?.toLowerCase?.().includes(q) ?? false) ||
        (String(job.experience).toLowerCase().includes(q))
      );
    }

    setFilteredJobs(results);
    setCurrentPage(1); // Reset page on new filters
  }, [filters, searchQuery, jobs]);

  // Pagination
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);

  // Handle filters
  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const updated = prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updated };
    });
  };

  return (
    <div className="w-10/12 mx-auto py-20">
      <h1 className="text-5xl font-semibold">Job Search</h1>
      <p className="text-2xl font-medium text-gray-700 mt-2">
        Search for your desired job matching your skills
      </p>

      {/* Search Box */}
      <div className="relative mt-6">
        <div
          className={`absolute left-5 top-1/2 transform -translate-y-1/2 flex items-center space-x-4 text-gray-400 text-xl ${
            isFocused || searchQuery ? "hidden" : "block"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <IoSearch />
          <span>Enter Job title</span>
          <FaMapMarkerAlt />
          <span>Location</span>
          <MdWork />
          <span>Experience</span>
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full text-2xl border-2 py-5 pl-5 pr-24 rounded-md text-gray-800 placeholder-transparent outline-none"
          placeholder="Enter Job title, Location, Experience"
        />
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-primary rounded-md py-4 px-8 text-white"
          onClick={() => {
            // Force search effect to trigger
            setSearchQuery((prev) => prev.trim());
          }}
        >
          Search
        </button>
      </div>

      {/* Main Layout */}
      <div className="mt-20 flex gap-8">
        {/* Filters */}
        <div className="w-4/12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <p
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={() =>
                setFilters({
                  jobTypes: [],
                  jobModes: [],
                  functions: [],
                  experienceLevels: [],
                })
              }
            >
              Clear All
            </p>
          </div>
          <JobFilter
            jobs={jobs}
            filters={filters}
            onChange={handleFilterChange}
          />
        </div>

        {/* Job Results */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Results</h2>
            <p>Showing {filteredJobs.length} result(s)</p>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading jobs...</p>
          ) : currentJobs.length > 0 ? (
            <div className="grid grid-cols-2 gap-10">
              {currentJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-red-500 mt-6">No jobs found with the selected filters.</p>
          )}

          {/* Pagination */}
          {filteredJobs.length > jobsPerPage && (
            <div className="flex gap-4 mt-10 justify-center">
              {Array.from(
                { length: Math.ceil(filteredJobs.length / jobsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
