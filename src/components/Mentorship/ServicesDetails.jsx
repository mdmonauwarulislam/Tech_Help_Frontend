import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ServicesDetails = ({ services: passedServices }) => {
  const [loadingServiceId, setLoadingServiceId] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    try {
      const bookingsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/getMenteeBookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allBookings = bookingsRes.data.data;

      // 🔗 Merge booking info into each passed service
      const merged = passedServices.map((service) => {
        const currentBooking = allBookings.find(
          (booking) =>
            booking.service === service._id && booking.status !== "cancelled"
        );
        return { ...service, currentBooking };
      });

      setServices(merged);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings.");
    }
  };

  useEffect(() => {
    if (passedServices?.length > 0) {
      fetchBookings();
    }
  }, [passedServices]);

  const handleBookService = async (serviceId) => {
    setLoadingServiceId(serviceId);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized access! Please log in.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/mentor/createBooking`,
        { serviceId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Service booked successfully!");
      await fetchBookings();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to book service. Please try again.");
      }
    } finally {
      setLoadingServiceId(null);
    }
  };

  if (services.length === 0) return <p>No services available.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Services</h2>
      {services.map((service) => {
        const { _id, title, description, price, duration, currentBooking } =
          service;
        const status = currentBooking?.status;
        const paymentStatus = currentBooking?.paymentStatus;
        const bookingId = currentBooking?._id;

        let buttonText = "Book Now";
        let buttonDisabled = false;
        let onClick = () => handleBookService(_id);

        if (status === "pending") {
          buttonText = "Awaiting Mentor Approval";
          buttonDisabled = true;
        } else if (status === "accepted") {
          if (paymentStatus === "pending") {
            buttonText = "Proceed to Payment";
            onClick = () => navigate(`/payment/${bookingId}`);
          } else {
            buttonText = "Booked (Paid)";
            buttonDisabled = true;
          }
        } else if (status === "declined" || status === "completed") {
          buttonText = "Rebook";
          onClick = () => handleBookService(_id);
        }

        return (
          <div
            key={_id}
            className="flex justify-between items-center border border-primary p-4 mb-3 rounded-lg shadow-lg"
          >
            <div>
              <h3 className="font-medium text-primary">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
              <p className="text-sm mt-2">
                Duration: {duration} mins | ₹{price}
              </p>
              {status && (
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  Booking Status: <strong>{status}</strong>
                </p>
              )}
            </div>
            <button
              onClick={onClick}
              disabled={loadingServiceId === _id || buttonDisabled}
              className={`mt-4 px-4 py-2 rounded-full transition ${
                buttonDisabled
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/80"
              }`}
            >
              {loadingServiceId === _id ? "Loading..." : buttonText}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesDetails;
