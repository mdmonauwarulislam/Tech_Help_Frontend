import { HiOutlineCalendarDays } from "react-icons/hi2";
import { GiMoneyStack } from "react-icons/gi";
import { PiNotebook } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const NextSteps = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Edit Availability",
      icon: <HiOutlineCalendarDays />,
      status: "complete",
      path: "/mentor-dashboard/availability",
    },
    { 
      title: "Add Payment", 
      icon: <GiMoneyStack />, 
      status: "incomplete",
      path: "/mentor-dashboard/payments",
    },
    { 
      title: "Add Education", 
      icon: <PiNotebook />, 
      status: "incomplete",
      path: "/mentor-dashboard/profile",
    },
  ];

  return (
    <div className="bg-white rounded-2xl">
      <div className="px-5 py-6">
        <h1 className="text-xl font-medium">Next steps for you</h1>
      </div>
      <div className="border-b-2 "></div>
      <div className="grid grid-cols-3 gap-5 p-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border-2 p-6 rounded-2xl flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => navigate(step.path)}
          >
            <div className="text-5xl rounded-full p-5 bg-blue-50 text-primary relative">
              {step.icon}
              <div className="absolute bottom-0 right-0 text-xl bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shadow">
                +
              </div>
            </div>

            <h2 className="text-primary font-semibold text-lg mt-4">
              {step.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextSteps;
