import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const JobDashboardCard = ({ closeMenus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); 

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleLinkClick = (to) => {
    if (to) navigate(to);
    if (closeMenus) closeMenus();
    setIsModalOpen(false);
  };

  const profileMenuItems = () => [
    { label: "Edit", to: "/editjob" },
    { label: "Delete", to: "/deletejob" },
    { label: "View Applicants", to: "/viewapplicants" },
  ];

  const getJobTypeStyles = (jobType) => {
    switch (jobType?.toUpperCase()) {
      case "FULL TIME":
        return "bg-green-200 text-green-900";
      case "PART TIME":
        return "bg-purple-200 text-purple-900";
      case "INTERNSHIP":
        return "bg-blue-200 text-blue-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white relative">
      <div className="flex items-center">
        {/* Job Title and Badge */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold flex items-center">
            Junior Graphic Designer (Web)
            <span
              className={`px-3 py-1 text-sm rounded-full ml-2 ${getJobTypeStyles(
                "Full Time"
              )}`}
            >
              Full Time
            </span>
          </h2>
        </div>
        {/* Three-dot Menu */}
        <div className="relative cursor-pointer" onClick={toggleModal} ref={menuRef}>
          <FiMoreVertical className="text-xl text-gray-600 hover:text-black" />
          {isModalOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
              <ul className="py-1 text-sm text-gray-700">
                {profileMenuItems().map(({ label, to }) => (
                  <li
                    key={label}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLinkClick(to)} 
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Location, Salary, and Tags */}
      <div className="mt-2 flex justify-between">
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <IoLocationOutline className="text-xl text-black" />
          <span>New York</span>
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <PiSuitcaseSimpleDuotone className="text-xl text-black" />
          <span>Full Time</span>
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MdOutlineCurrencyRupee className="text-xl text-black" />
          <span>500000 - 900000</span>
        </p>
      </div>
    </div>
  );
};

export default JobDashboardCard;
