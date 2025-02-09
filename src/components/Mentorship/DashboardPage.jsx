import NextSteps from "../../components/Mentorship/NextSteps";
import ServicesList from "../../components/Mentorship/ServicesList";

const WelcomeBanner = () => {
  return (
    <div className="mt-6 mb-20 flex items-center gap-3">
      <div>
        <h1 className="text-5xl">👋</h1>
      </div>
      <div>
        <h1 className="text-lg font-medium text-gray-800">Hi, Md Monauwarul Islam</h1>
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="bg-blue-gray-50 h-screen flex">
      <main className="flex-1 max-h-screen overflow-y-scroll sticky top-0" style={{
        scrollbarWidth: 'none'
      }}>
        <WelcomeBanner />
        <NextSteps />
        <ServicesList />
        
      </main>
    </div>
  );
};

export default DashboardPage;
