/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaHome, FaUsers, FaBriefcase, FaFileAlt } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 

const BottomNav = ({ toggleSidebar }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleMoreClick = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  return (
    <div className="fixed z-50 bg-white bottom-0 left-0 right-0 shadow-inner border-primary border-2 text-primary flex justify-around items-center h-16 rounded-t-xl p-2 md:hidden">
      {/* Home Button */}
      <button 
        onClick={() => navigate('/signup')}
        className="flex flex-col items-center hover:text-blue-800"
      >
        <FaHome size={24} />
        <span className="text-xs">Home</span>
      </button>

      {/* Mentorship Button */}
      <button 
        onClick={() => navigate('/mentorship')} // Navigate to mentorship
        className="flex flex-col items-center hover:text-blue-800"
      >
        <FaUsers size={24} />
        <span className="text-xs">Mentorship</span>
      </button>

      {/* Career Button */}
      <button 
        onClick={() => { navigate('/career'); toggleSidebar(); }} // Navigate to career
        className="relative flex flex-col items-center hover:text-blue-800 bg-white rounded-full shadow-inner"
      >
        <div className="rounded-full border-2 border-primary hover:border-blue-800 p-3">
          <FaBriefcase className=" text-2xl" />
        </div>
        <span className="text-xs mb-6">Career</span>
      </button>

      {/* Roadmap Button */}
      <button 
        onClick={() => navigate('/roadmap')} // Navigate to roadmap
        className="flex flex-col items-center hover:text-blue-800"
      >
        <FaFileAlt size={24} />
        <span className="text-xs">Roadmap</span>
      </button>

      {/* More Button */}
      <button 
        onClick={handleMoreClick} 
        className="flex flex-col items-center hover:text-blue-800"
      >
        <MdMoreVert size={24} />
        <span className="text-xs">More</span>
      </button>

      {/* More Options Card */}
      {isMoreOpen && (
        <div className="absolute bottom-16 right-4 transform translate-x-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-36">
          <button 
            onClick={() => { navigate('/message'); setIsMoreOpen(false); }} // Navigate to message
            className="flex items-center text-gray-600 hover:text-blue-500 w-full py-2"
          >
            <FaBriefcase className="mr-2" />
            Message
          </button>
          <button 
            onClick={() => navigate('/projects')} // Navigate to projects
            className="flex items-center text-gray-600 hover:text-blue-500 w-full py-2"
          >
            <FaFileAlt className="mr-2" />
            Projects
          </button>
          <button 
            onClick={() => navigate('/settings')} // Navigate to settings
            className="flex items-center text-gray-600 hover:text-blue-500 w-full py-2"
          >
            <FaFileAlt className="mr-2" />
            Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default BottomNav;
