import { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import AddResponsibilityForm from './AddResponsibilityForm';

const AddResponsibilityDeatils = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="mr-5">
            <FaFileAlt size={30} />
          </div>
          <div>
            <div className="text-lg font-semibold">Add Position of Responsibility</div>
            <div className="text-sm text-gray-500">Add any PORs like college clubs, social service, community head, fest organized, etc.</div>
          </div>
        </div>
        <button
          onClick={openModal}
          type="button"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
        >
          + Add new
        </button>
      </div>

      {/* Render the modal */}
      <AddResponsibilityForm isOpen={isModalOpen} onClose={closeModal}
      />
      </>
    );
  };
  
  export default AddResponsibilityDeatils;
  