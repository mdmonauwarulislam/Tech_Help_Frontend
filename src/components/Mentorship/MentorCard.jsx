/* eslint-disable react/prop-types */


  

const MentorCard = ({mentor}) => {
    
  return (
    <div className="max-w-sm rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg p-5 bg-white">
      <div className="flex items-center justify-between">
        <span className="text-sm text-green-500 font-semibold px-2 border border-green-500 rounded-full">Available</span>
        <div className="text-yellow-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-3.582-8-8s3.582-8 8 8 8-3.582 8-8-3.582-8-8-8z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center mt-4 flex-col justify-center">
        <img className="w-24 h-24 rounded-full mr-4" src={mentor.profilePic} alt="Profile" />
        <div className="text-sm flex flex-row items-center mt-2">
          
          <p className="text-gray-900 text-lg leading-none">{mentor.name}</p>
          <p className="text-gray-600 ml-2">⭐ {mentor.rating}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <p className="text-gray-700 text-sm truncate">{mentor.description}</p>
      </div>
      <div className="mt-4 flex w-full justify-center">
        <button className="border border-gray-800 hover:bg-blue-gray-50 text-gray-800  py-1 px-4 rounded-full">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
