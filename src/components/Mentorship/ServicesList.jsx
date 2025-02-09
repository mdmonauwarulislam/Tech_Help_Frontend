import ServiceCard from "./ServiceCard";
import { BiVideo } from "react-icons/bi";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const ServicesList = () => {
    const services = [
      {
        icon : <BiVideo className="w-7 h-7 text-primary"/>,
        title: "Quick Call",
        description: "30 mins quick call to achieve your goals faster with a personalized roadmap.",
        price: 750,
        duration: "30 mins",
      },
      {
        icon : <BiVideo className="w-7 h-7 text-primary"/>,
        title: "60 min Mentor Meet",
        description: "1:1 mentorship session for personalized, hands-on, and practical guidance.",
        price: 1500,
        duration: "60 mins",
      },
      {
        icon : <HiOutlineChatAlt2 className="w-7 h-7 text-primary"/>,
        title: "Ask a Query",
        description: "Resolve any query in detail with actionable insights.",
        price: 100,
        duration: "3 Days",
      },
    ];
  
    return (
      <div className="my-5 bg-white p-5 grid grid-cols-3 gap-5 rounded-2xl">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            price={service.price}
            duration={service.duration}
          />
        ))}
      </div>
    );
  };
  
  export default ServicesList;