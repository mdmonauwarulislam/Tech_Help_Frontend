import { useEffect, useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineModeEdit } from 'react-icons/md';

const AddAchievement = () => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [extraActivity, setExtraActivity] = useState('');
  const [achievements, setAchievements] = useState([]); 
  const [selectedAchievement, setSelectedAchievement] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); 
  const [achievementToDelete, setAchievementToDelete] = useState(null);

  // Open input field for adding a new achievement
  const openInputField = () => {
    setIsAddingActivity(true);
    setIsEditing(false); 
    setExtraActivity('');
  };

  // Handle adding or updating an achievement
  const handleAddActivity = async () => {
    try {
      if (isEditing && selectedAchievement) {
        // Update achievement
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/student/updateAchievement/${selectedAchievement._id}`,
          { activity: extraActivity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success('Achievement updated successfully');
        }
      } else {
        // Add achievement
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/student/addAchievement`,
          { activity: extraActivity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.status === 201) {
          toast.success('Achievement added successfully');
        }
      }

      getAchievements(); 
      setIsAddingActivity(false);
      setExtraActivity('');
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to add/update achievement');
    }
  };

  // Fetch all achievements
  const getAchievements = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/getAchievements`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setAchievements(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load achievements');
    }
  };

  // Open confirmation modal to delete achievement
  const handleDeleteAchievement = (achievement) => {
    setAchievementToDelete(achievement);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm deletion of achievement
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/student/deleteAchievement/${achievementToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Achievement deleted successfully');
        getAchievements();
      }
      setIsDeleteConfirmOpen(false);
      setAchievementToDelete(null);
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete achievement');
    }
  };

  // Handle editing an achievement
  const handleEditAchievement = (achievement) => {
    setIsEditing(true);
    setIsAddingActivity(true);
    setExtraActivity(achievement.activity); 
    setSelectedAchievement(achievement);
  };

  // Handle cancel action
  const handleCancel = () => {
    setIsAddingActivity(false);
    setIsEditing(false);
    setExtraActivity(''); 
  };

  // Cancel the delete action
  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setAchievementToDelete(null);
  };

  // Fetch achievements on component mount
  useEffect(() => {
    getAchievements();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="mr-5">
            <FaFileAlt size={30} />
          </div>
          <div>
            <div className="text-lg font-semibold">
              Add Achievements/ Extracurricular Activity
            </div>
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

      {/* Input form for adding/editing achievements */}
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
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {/* List of all achievements */}
      <div className="mt-5">
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <div
              key={achievement._id}
              className="flex items-center mt-5 justify-between px-10 py-5 border rounded-md  border-gray-300"
            >
              <div className='text-xl'>{achievement.activity}</div>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleEditAchievement(achievement)}
                  className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center"
                >
                  <MdOutlineModeEdit size={20} className="inline" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAchievement(achievement)}
                  className="py-1 px-3 border-2 gap-1 items-center flex border-red-500 rounded-md text-red-500 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-5">
            No achievements added yet.
          </div>
        )}
      </div>

      {/* Confirmation Modal for Deletion */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={cancelDelete}
          ></div>
          <div className="bg-white p-5 rounded-md z-10 relative">
            <h4 className="text-lg font-bold mb-4">Confirm Deletion</h4>
            <p>Are you sure you want to delete this achievement?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAchievement;
