import { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import AddCertificationForm from './AddCertificationForm'; // Your form component
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineModeEdit } from 'react-icons/md';

const AddCertifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certifications, setCertifications] = useState([]); // State to hold certifications data
  const [selectedCertification, setSelectedCertification] = useState(null); // For editing
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for delete confirmation modal
  const [certificationToDelete, setCertificationToDelete] = useState(null); // Certification to be deleted

  // Open modal for adding or editing certifications
  const openModal = (certification = null) => {
    setSelectedCertification(certification); // Pass the certification if editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertification(null); // Reset after closing the modal
  };

  // Fetch all certifications
  const fetchCertifications = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/student/getAllCertifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCertifications(response.data.data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      toast.error('Failed to load certifications');
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  // Function to delete a certification
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/student/deleteCertification/${certificationToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCertifications(certifications.filter(cert => cert._id !== certificationToDelete._id));
      toast.success('Certification deleted successfully');
      setIsDeleteConfirmOpen(false); // Close the confirmation modal
    } catch (error) {
      console.error('Error deleting certification:', error);
      toast.error('Failed to delete certification');
    }
  };

  // Open the delete confirmation modal
  const openDeleteConfirmModal = (certification) => {
    setCertificationToDelete(certification);
    setIsDeleteConfirmOpen(true);
  };

  // Close the delete confirmation modal
  const closeDeleteConfirmModal = () => {
    setCertificationToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="mr-5">
            <FaFileAlt size={30} />
          </div>
          <div>
            <div className="text-lg font-semibold">Add Certificate/Course Details</div>
            <div className="text-sm text-gray-500">All Certifications/Courses you have done</div>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          type="button"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
        >
          + Add new
        </button>
      </div>

      {/* List of certifications */}
      <div className="mt-6">
        {certifications.length > 0 ? (
          <ul>
            {certifications.map(cert => (
              <li key={cert._id} className="mb-4 p-4 border border-gray-300 rounded-md shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">{cert.title}</h4>
                    <p className="text-sm text-gray-600">Completed: {cert.completionMonth} {cert.completionYear}</p>
                    <div className="mt-4 flex space-x-2 text-gray-500">
              {cert.skills && cert.skills.length > 0 ? (
                cert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span>No skills specified.</span>
              )}
            </div>
                    <ul className="list-disc list-inside text-gray-500 mt-2">
                      {cert.descriptionPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    {cert.certificationLink && (
                      <Link
                        to={cert.certificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm"
                      >
                        View Certification
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openModal(cert)} // Open modal with the certification for editing
                      className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center"
                      >
                        <MdOutlineModeEdit size={20} className="inline" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirmModal(cert)} 
                      className="py-1 px-3 border-2 gap-1 items-center flex border-red-500 rounded-md text-red-500 text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No certifications added yet.</p>
        )}
      </div>

      {/* Render the certification form modal */}
      <AddCertificationForm
        isOpen={isModalOpen}
        onClose={closeModal}
        certification={selectedCertification} // Pass the selected certification for editing
      />

      {/* Render the delete confirmation modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeDeleteConfirmModal}></div>
          <div className="bg-white p-5 rounded-md z-10 relative">
            <h4 className="text-lg font-bold mb-4">Confirm Deletion</h4>
            <p>Are you sure you want to delete this certification?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={closeDeleteConfirmModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default AddCertifications;
