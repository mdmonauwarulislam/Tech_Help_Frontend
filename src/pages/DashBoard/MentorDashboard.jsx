import MentorDashboardSidebar from "../../components/Mentorship/MentorDashboardSidebar";
import { Outlet } from "react-router-dom";

const MentorDashboard = () => {
  
  return (
    <div className="bg-blue-gray-50 h-screen flex">
      {/* Sidebar */}
      <MentorDashboardSidebar className="" />

      {/* Main Content */}
      <main
        className="flex-1 p-6 max-h-screen overflow-y-scroll sticky top-0"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MentorDashboard;
