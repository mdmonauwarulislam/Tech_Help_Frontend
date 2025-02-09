import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronDown, BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice";

const navLinks = [
  { label: "Home", to: "/", allow: ["student", "company"] },
  { label: "Job Search", to: "/job-page", allow: ["student"] },
  { label: "Mentorship", to: "/mentorship", allow: ["student"] },
  { label: "Roadmap", to: "/roadmap", allow: ["student"] },
  { label: "Blogs", to: "/blog", allow: ["student", "company"] },
];

const ProfileMenu = ({ closeMenus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedInUser = useSelector((state) => state?.user?.isLoggedIn);
  const role = useSelector((state) => state?.user?.user?.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInUser);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/login");
    closeMenus();
  };

  const handleLinkClick = (to) => {
    if (to) navigate(to);
    closeMenus();
    setIsMenuOpen(false);
  };

  const profileMenuItems = () => {
    if (role === "student") {
      return [
        { label: "Dashboard", to: "/userdashboard" },
        { label: "My Blog", to: "/myblog" },
        { label: "Sign Out", signout: true },
      ];
    } else if (role === "company") {
      return [
        { label: "Dashboard", to: "/companydashboard" },
        { label: "Profile", to: "/companyProfile" },
        { label: "Post Job", to: "/post-job" },
        { label: "Sign Out", signout: true },
      ];
    }
    return [];
  };

  useEffect(() => {
    console.log("role:",role);
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }, [isLoggedInUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {isLoggedIn ? (
        <>
          <button
            onClick={toggleMenu}
            className="flex items-center gap-1 p-2 border rounded-full hover:bg-gray-200"
          >
            <img
              className="w-8 h-8 rounded-full border border-gray-900"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
              alt="profile"
            />
            <BiChevronDown className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="p-1">
                {Array.isArray(profileMenuItems()) &&  profileMenuItems().length>0 && profileMenuItems().map(({ label, to, signout }) => (
                  <li
                    key={label}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={signout ? handleSignOut : () => handleLinkClick(to)}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/login"
          className="px-3 py-2 text-primary hover:text-white hover:bg-primary rounded-md border border-primary"
        >
          Login
        </Link>
      )}
    </div>
  );
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const role = useSelector((state) => state?.user?.user?.role);

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="mx-auto w-full p-2 bg-white shadow-lg">
      <div className="flex items-center justify-between md:w-10/12 w-11/12 mx-auto">
        <Link
          to="/"
          className="mr-4 ml-2 text-primary cursor-pointer py-2 font-bold text-2xl md:text-3xl xl:text-4xl"
        >
          Tech Help
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks
            .filter(({ allow }) => allow.includes(role) || allow === "all") 
            .map(({ label, to }) => (
              <div key={label} className="relative">
                <Link
                  to={to}
                  className="hover:bg-primary hover:text-white text-primary rounded-md p-2"
                  onClick={closeMenus}
                >
                  {label}
                </Link>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-4">
          <ProfileMenu closeMenus={closeMenus} />
          <button
            className="md:hidden flex items-center p-2 hover:bg-primary hover:text-white text-primary rounded-md"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <BiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200" ref={mobileMenuRef}>
          <ul className="flex flex-col p-4">
            {navLinks.map(({ label, to }) => (
              <li key={label} className="mb-2">
                <Link
                  to={to}
                  className="p-2 block hover:bg-primary hover:text-white text-primary rounded-md"
                  onClick={closeMenus}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
