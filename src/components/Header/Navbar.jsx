import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaCog,
  FaEnvelope,
  FaLifeRing,
  FaSignOutAlt,
} from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { SiHelpscout } from "react-icons/si";

// Profile menu items
const profileMenuItems = [
  { label: "My Profile", icon: FaUserCircle, to: "/userdashboard" },
  { label: "Edit Profile", icon: FaCog },
  { label: "Inbox", icon: FaEnvelope },
  { label: "Help", icon: FaLifeRing },
  { label: "Sign Out", icon: FaSignOutAlt, signout: true }, 
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle Sign Out functionality
  const handleSignOut = () => {
    // Clear token from localStorage (or sessionStorage)
    localStorage.removeItem("token");
    // Redirect to login or homepage after sign-out
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-1 p-2 border rounded-full text-gray-700 hover:bg-gray-200"
      >
        <img
          className="w-8 h-8 rounded-full border border-gray-900"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="profile"
        />
        <BiChevronDown
          className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="p-1">
            {profileMenuItems.map(({ label, icon: Icon, to }) => (
              <li
                key={label}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                {to ? (
                  <Link
                    to={to}
                    className="flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-normal">{label}</span>
                  </Link>
                ) : (
                  <div
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-normal">{label}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Navbar component
export function Navbar() {
  return (
    <nav className="mx-auto w-full p-2 bg-white shadow-lg">
      <div className="flex items-center justify-between text-blue-gray-900 md:w-10/12 w-11/12 mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="mr-4 ml-2 text-primary cursor-pointer py-2 font-bold text-2xl md:text-3xl xl:text-4xl "
        >
          <SiHelpscout className="inline mr-3 text-center" />
          Tech Help
        </Link>

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </nav>
  );
}

export default Navbar;
