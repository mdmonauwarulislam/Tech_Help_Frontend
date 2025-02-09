import { NavLink } from "react-router-dom";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { LuSmilePlus } from "react-icons/lu";
import { PiClockUser } from "react-icons/pi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { FcFaq } from "react-icons/fc";

const MentorDashboardSidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <RiDashboardHorizontalLine />, path: "/mentor-dashboard",  end: true },
    { name: "Profile", icon: <CgProfile />, path: "/mentor-dashboard/profile" },
    // { name: "Social Media Kit", icon: <MdOutlinePhotoLibrary />, path: "/mentor-dashboard/social-media-kit", new: true },
    { name: "Services", icon: <CgNotes />, path: "/mentor-dashboard/services", new: true },
    { name: "Bookings", icon: <LuSmilePlus />, path: "/mentor-dashboard/bookings" },
    { name: "Availability", icon: <PiClockUser />, path: "/mentor-dashboard/availability" },
    { name: "Payments", icon: <RiMoneyRupeeCircleLine />, path: "/mentor-dashboard/payments", dot: true },
    { name: "Reviews", icon: <MdOutlineRateReview />, path: "/mentor-dashboard/reviews" },
  ];


  return (
    <aside
      className="w-80 bg-white shadow-md p-6 h-screen overflow-y-scroll sticky top-0"
      style={{
        scrollbarWidth: "none",
      }}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
          alt="Profile"
          className="rounded-full border-2 border-gray-300 h-24 w-24"
        />
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold">Md Monauwarul Islam</h2>
          <p className="text-gray-500 text-sm">/mdmonauwarulislam</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            end={item.end || false}
            className={({ isActive }) =>
              `flex items-center justify-between text-gray-800 py-3 px-4 rounded-md cursor-pointer hover:bg-blue-50 ${
                isActive ? "bg-blue-100 font-bold" : ""
              }`
            }
            aria-label={item.name}
          >
            <span className="flex items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              {item.name}
            </span>
            {item.new && <span className="text-red-500 text-xs">New</span>}
            {item.dot && <span className="bg-red-500 rounded-full w-2 h-2"></span>}
          </NavLink>
        ))}

        {/* Separator */}
        <div className="border-t-2 border-dotted border-green-200 mt-16"></div>

        {/* FAQs Section */}
        <NavLink
          to="/faqs"
          className={({ isActive }) =>
            `flex items-center justify-between mt-10 text-green-800 py-3 px-4 rounded-md cursor-pointer hover:bg-green-50 ${
              isActive ? "bg-green-100 font-bold" : ""
            }`
          }
          aria-label="FAQs"
        >
          <span>
            <FcFaq className="inline mr-2 text-2xl text-center" />
            FAQs
          </span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default MentorDashboardSidebar;
