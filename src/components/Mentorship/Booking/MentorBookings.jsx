import { useEffect, useState } from "react";
import axios from "axios";

const MentorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/booking/mentor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleResponse = async (bookingId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/booking/respond/${bookingId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Booking ${status}!`);
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error responding to booking:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="p-4 border rounded-lg shadow-md mb-4">
          <p><strong>Mentee:</strong> {booking.mentee.name}</p>
          <p><strong>Service:</strong> {booking.service.title}</p>
          <div className="mt-3">
            <button
              onClick={() => handleResponse(booking._id, "accepted")}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleResponse(booking._id, "declined")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorBookings;
