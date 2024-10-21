import { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import AddCertificationForm from './AddCertificationForm';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCertifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certifications, setCertifications] = useState([]); // State to hold certifications data
  const [selectedCertificationId, setSelectedCertificationId] = useState(null); // For editing

  const openModal = (certificationId = null) => {
    setSelectedCertificationId(certificationId); // If editing, pass the ID
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificationId(null); // Reset the selected certification after closing the modal
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
    }
  };

  useEffect(() => {
    fetchCertifications(); 
  }, []);

  // Function to delete a certification
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/student/deleteCertification/${id}`); 
      setCertifications(certifications.filter(cert => cert._id !== id));
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
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
              <li key={cert._id} className="mb-4 p-4 border border-gray-300 rounded-md shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">{cert.title}</h4>
                    <p className="text-sm text-gray-600">Completed: {cert.completionMonth} {cert.completionYear}</p>
                    <p className="text-sm text-gray-600">Skills: {cert.skills.join(', ')}</p>
                    <ul className="list-disc list-inside mt-2">
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
                      onClick={() => openModal(cert._id)} 
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cert._id)}
                      className="text-red-500 hover:text-red-700"
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

      {/* Render the modal */}
      <AddCertificationForm
        isOpen={isModalOpen}
        onClose={closeModal}
        certificationId={selectedCertificationId} // Pass the certification ID to the modal for editing
      />
    </>
  );
};

export default AddCertifications;
