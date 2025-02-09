
import StatsCard from "./StatsCard";
import Tabs from "./Tabs";
import Filters from "./Filters";
import { FiUser } from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";
import { LiaRupeeSignSolid } from "react-icons/lia";

const Booking = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-2xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <p className="text-gray-500 text-sm">Manage Bookings</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Total Mentees"
          value="0"
          icon = {<FiUser />}
        />
        <StatsCard
          title="Upcoming Session(s)"
          value="0"
          icon= {<BsCalendarCheck />}
        />
        <StatsCard
          title="Pending Payments"
          value="₹ 0.00"
          icon= {<LiaRupeeSignSolid />}
          subtitle="(Exclusive of platform fees)"
        />
      </section>

      {/* Tabs and Filters */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 items-center mb-6">
        <Tabs
          tabs={["All", "1:1 Call", "Queries", "Resources", "Webinar"]}
          activeTab="1:1 Call"
        />
        <Filters />
      </div>

      {/* Content Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming</h2>
        <div className="flex flex-col items-center justify-center text-center py-16 bg-white shadow rounded-lg">
          <img
            src="https://www.agencija-corrigo.com/build/images/background/no-results-bg.2d2c6ee3.png"
            alt="No Data"
            className="w-40 h-40 mb-4"
          />
          <p className="text-gray-500 text-lg">No data available</p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
