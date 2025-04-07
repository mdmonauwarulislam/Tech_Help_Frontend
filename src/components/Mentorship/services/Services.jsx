import { useEffect, useState } from "react";
import { FcOnlineSupport, FcIdea } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";

// Resource Card Component
const ResourceCard = ({ service, onClaim }) => {
  return (
    <div className="bg-blue-gray-50 shadow-md rounded-lg p-4 mb-4">
      {/* Service Category */}
      <div className="flex justify-between w-fit gap-2 items-center border rounded-2xl bg-white px-2 py-2">
        <span>
          {service.category === "Resource" ? <FcIdea /> : <FcOnlineSupport />}
        </span>
        <h1>{service.category}</h1>
      </div>

      {/* Service Title */}
      <h2 className="text-xl font-semibold text-gray-800 mt-3">{service.title}</h2>

      {/* Claim Button */}
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => onClaim(service)}
          className="bg-white text-gray-800 px-4 py-3 font-semibold hover:bg-primary hover:text-white w-full rounded-full my-3 flex items-center justify-center"
        >
          <h1>Claim Now</h1>
          <span className="font-bold ml-3 text-xl">₹{service.price}</span>
        </button>
      </div>
    </div>
  );
};

// Services Component
const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch services dynamically
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized access! Please log in.");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mentor/getAllServices`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setServices(response.data);
          setFilteredServices(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter((service) => service.category === category));
    }
  };

  // Handle Claim Now Button
  const handleClaim = (service) => {
    toast.success(`You have claimed "${service.title}" for ₹${service.price}`);
    // TODO: Implement booking or payment logic here
  };

  return (
    <div className="p-6 w-full mx-auto">
      {/* Heading */}
      <div>
        <h1 className="font-semibold text-xl">Available Services</h1>
        <p className="text-base">Discover our mentorship offerings designed for your success</p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-4 my-6 border-2 border-primary rounded-full w-fit px-2 py-2">
        {["All", "1:1 Call", "Resource"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services List */}
      {loading ? (
        <p className="text-center">Loading services...</p>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <ResourceCard key={index} service={service} onClaim={handleClaim} />
          ))}
        </div>
      ) : (
        <p className="text-center">No services available</p>
      )}
    </div>
  );
};

export default Services;
