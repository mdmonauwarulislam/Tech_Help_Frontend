import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/getMentorBookings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch mentor bookings.");
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem("token");
    setLoadingId(bookingId);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/mentor/respondToBooking/${bookingId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Booking ${status === "accepted" ? "accepted" : "declined"}`);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to update booking status.");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (!bookings.length) return <p className="text-gray-500 text-center">No bookings available.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary mb-2">Booking Management</h2>
      {bookings.map((booking) => {
        const { _id, service, mentee, status, paymentStatus } = booking;

        return (
          <div
            key={_id}
            className="p-6 border border-primary rounded-lg shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-primary">{service?.title}</h3>
              <p className="text-sm text-gray-700">{service?.description}</p>
              <p className="text-sm mt-1">₹{service?.price} • {service?.duration} mins</p>

              <div className="flex gap-3 mt-2 text-sm">
                <span className={`px-2 py-1 rounded-full text-white ${
                  status === "pending"
                    ? "bg-yellow-500"
                    : status === "accepted"
                    ? "bg-blue-600"
                    : status === "declined"
                    ? "bg-red-500"
                    : status === "completed"
                    ? "bg-green-600"
                    : "bg-gray-400"
                }`}>
                  {status}
                </span>
                {paymentStatus && (
                  <span className="px-2 py-1 rounded-full bg-green-600 text-white">Paid</span>
                )}
                {!paymentStatus && (
                  <span className="px-2 py-1 rounded-full bg-orange-600 text-white">Unpaid</span>
                )}

               
              </div>

              <div className="mt-2 text-sm text-gray-500">
                <strong>Mentee:</strong> {mentee?.username || "N/A"} ({mentee?.email || "N/A"})
              </div>
            </div>

            {status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateBookingStatus(_id, "accepted")}
                  disabled={loadingId === _id}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {loadingId === _id ? "Processing..." : "Accept"}
                </button>
                <button
                  onClick={() => updateBookingStatus(_id, "declined")}
                  disabled={loadingId === _id}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {loadingId === _id ? "Processing..." : "Decline"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Booking;
