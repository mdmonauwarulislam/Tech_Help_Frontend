/* eslint-disable react/prop-types */
const MentorCard = ({ mentor, onClick }) => {
  return (
    <div
      className="max-w-sm rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg p-5 bg-white cursor-pointer hover:shadow-xl transition"
      onClick={onClick}
    >
      {/* Availability & Rating */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-green-500 font-semibold px-2 border border-green-500 rounded-full">
          Available
        </span>
        <p className="text-gray-600 ml-2">⭐ {mentor.rating}</p>
      </div>

      {/* Profile Picture & Name */}
      <div className="flex items-center mt-4 flex-col justify-center">
      <img
            src={`${
              mentor.profilePicture ? (
                `${import.meta.env.VITE_API_URL}/uploads/${mentor.profilePicture}`
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
                  alt="Profile"
                  className="rounded-full border-2 border-gray-300 h-24 w-24"
                />
              )
            }`}
            className="h-28 w-28 rounded-full border-4 border-white"
            alt="Profile"
          />
        <p className="text-gray-900 text-lg leading-none mt-2">{mentor.username}</p>
      </div>

      {/* Mentor Description */}
      <div className="mt-4 flex justify-center">
        <p className="text-gray-700 text-sm text-center">{mentor.experties}</p>
      </div>

      {/* View Profile Button */}
      <div className="mt-4 flex w-full justify-center">
        <button className="border border-gray-800 hover:bg-blue-gray-50 text-gray-800 py-1 px-4 rounded-full">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
