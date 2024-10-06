import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';

const AddAchievement = () => {
  const [isAddingActivity, setIsAddingActivity] = useState(false); 
  const [extraActivity, setExtraActivity] = useState(''); 

  const openInputField = () => {
    setIsAddingActivity(true);
  };

  const handleAddActivity = () => {
    console.log('Added Activity:', extraActivity);
    setIsAddingActivity(false);
    setExtraActivity(''); 
  };

  const handleCancel = () => {
    setIsAddingActivity(false);
    setExtraActivity(''); // Reset input on cancel
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="mr-5">
            <FaFileAlt size={30} />
          </div>
          <div>
            <div className="text-lg font-semibold">Add Achievements/ Extracurricular Activity</div>
            <div className="text-sm text-gray-500">
              Add your achievements of Hackathons, NGO services, Exam ranks, Clubs, etc.
            </div>
          </div>
        </div>
        <button
          onClick={openInputField}
          type="button"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
        >
          + Add new
        </button>
      </div>

      {isAddingActivity && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-md">
          <input
            type="text"
            value={extraActivity}
            onChange={(e) => setExtraActivity(e.target.value)}
            placeholder="Enter Extra Activity"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md outline-none focus:border-techBlue-500"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleAddActivity}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAchievement;
