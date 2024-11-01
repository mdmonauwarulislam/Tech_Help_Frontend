import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronDown, BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/slice/userSlice';

const navLinks = [
  { label: "Home", to: "/" },
  {
    label: "Job Search",
    to : "/job-page",
  },
  { label: "Mentorship", to: "/mentorship" },
  { label: "Roadmap", to: "/roadmap" },
  { label: "Blogs", to: "/blog" },
];

const ProfileMenu = ({ closeMenus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    closeMenus();
  };

  const handleLinkClick = (to) => {
    if (to) navigate(to);
    closeMenus();
    setIsMenuOpen(false);
  };

  const profileMenuItems = [
    { label: "My Profile", to: "/userdashboard" },
    { label: "Sign Out", signout: true },
    { label: "My Blog", to: "/myblog", },
  ];

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
            className="flex items-center gap-1 p-2 border rounded-full hover:bg-gray-200 "
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
                {profileMenuItems.map(({ label, to, signout }) => (
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
        <Link to="/login" className="px-3 py-2 text-primary hover:text-white hover:bg-primary rounded-md border border-primary">Login</Link>
      )}
    </div>
  );
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

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
          {navLinks.map(({ label, to, subMenu }) => (
            <div key={label} className="relative">
              {subMenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(label)}
                    className="flex items-center gap-1 hover:bg-primary hover:text-white text-primary rounded-md p-2"
                  >
                    {label}
                    <BiChevronDown className={`transition-transform ${activeDropdown === label ? "rotate-180" : ""}`} />
                  </button>
                  {activeDropdown === label && (
                    <div className="absolute mt-2 w-40 bg-white hover:text-white text-primary border border-gray-300 rounded-md shadow-lg z-10 ">
                      <ul className="p-1">
                        {subMenu.map((subItem) => (
                          <li key={subItem.label} className="p-2 hover:bg-primary hover:text-white text-primary rounded-md">
                            <Link to={subItem.to} onClick={closeMenus}>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to={to} className="hover:bg-primary hover:text-white text-primary rounded-md p-2" onClick={closeMenus}>
                  {label}
                </Link>
              )}
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
            {navLinks.map(({ label, to, subMenu }) => (
              <li key={label} className="mb-2">
                {subMenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(label)}
                      className="flex items-center justify-between p-2 w-full text-left hover:bg-primary hover:text-white text-primary rounded-md"
                    >
                      {label}
                      <BiChevronDown
                        className={`transition-transform ${activeDropdown === label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeDropdown === label && (
                      <ul className="pl-4">
                        {subMenu.map((subItem) => (
                          <li key={subItem.label} className="p-2 hover:bg-primary hover:text-white text-primary rounded-md">
                            <Link to={subItem.to} onClick={closeMenus}>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={to} className="p-2 block hover:bg-primary hover:text-white text-primary rounded-md" onClick={closeMenus}>
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
