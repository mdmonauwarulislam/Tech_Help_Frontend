import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { SiCodementor } from "react-icons/si";
import axios from "axios";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Services from API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/getAllServices`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data?.data && Array.isArray(response.data.data)) {
        setServices(response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="my-5 bg-white p-5 rounded-2xl">
      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {services?.data &&
          Array.isArray(services.data) &&
          services.data.length > 0 ? (
            services.data.map((service, index) => {
              console.log("Service received by ServiceCard:", service); // Debugging
              return service ? (
                <ServiceCard key={service._id || index} service={service} />
              ) : null;
            })
          ) : (
            <p className="text-center text-gray-500">No services found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesList;
