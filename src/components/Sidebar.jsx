import  { useState } from 'react';
import { FaHome, FaBriefcase, FaUsers, FaFileAlt } from 'react-icons/fa';
import { MdMenu, MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);
  const handleCareerClick = () => {
    if (!open) {
      setOpen(true);
    }
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    // Hide the sidebar on mobile devices
    <div className={`flex flex-col h-screen text-primary border-primary border-r-2 transition-transform ${open ? 'w-64' : 'w-16'} hidden md:flex`}>
      <button onClick={toggleSidebar} className="p-4 flex items-center">
        {open ? <MdClose className="text-3xl" /> : <MdMenu className="text-3xl" />}
      </button>

      <div className="flex-grow flex flex-col">
        <nav className="flex-grow overflow-y-auto">
          <ul className="flex flex-col">
            <li className=''>
              <Link to="/" className="flex items-center p-4 hover:bg-blue-50">
                <FaHome className="text-3xl" />
                {open && <span className="ml-4 text-xl font-medium">Home</span>}
              </Link>
            </li>
            
            <li>
              <button onClick={handleCareerClick} className="flex items-center p-4 hover:bg-blue-50 w-full">
                <FaBriefcase className="text-3xl" />
                {open && <span className="ml-4 text-xl">Career</span>}
              </button>
              {subMenuOpen && open && (
                <ul className={`pl-8 transition-transform`}>
                  <li>
                    <Link to="/internship" className="flex text-xl items-center p-2 hover:bg-blue-50">
                      <span>Internship</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/job" className="flex items-center text-xl p-2 hover:bg-blue-50">
                      <span>Job</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/other-jobs" className="flex items-center text-xl p-2 hover:bg-blue-50">
                      <span>Other Jobs</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/mentorship" className="flex items-center p-4 hover:bg-blue-50">
                <FaUsers className="text-3xl" />
                {open && <span className="ml-4 text-xl">Mentorship</span>}
              </Link>
            </li>
            <li>
              <Link to="/roadmap" className="flex items-center p-4 hover:bg-blue-50">
                <FaFileAlt className="text-3xl" />
                {open && <span className="ml-4 text-xl">Roadmap</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;