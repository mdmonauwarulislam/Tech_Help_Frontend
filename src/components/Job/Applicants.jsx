import React, { useState } from "react";

const ApplicantCard = ({ applicant, onViewProfile }) => {
  const [status, setStatus] = useState(applicant.status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const statusOptions = ["Pending", "Accepted", "Rejected"];

  return (
    <div className="w-full border rounded-lg shadow-md bg-white p-4 mb-4">
      {/* Top Row with Basic Info */}
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{applicant.name}</h2>
          <p className="text-sm text-gray-600">ID: {applicant.id}</p>
          <p className="text-sm text-gray-600">
            Applied On: {new Date(applicant.appliedOn).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Email: {applicant.email}</p>
          <p className="text-sm text-gray-600">
            Phone: {applicant.phone || "N/A"}
          </p>
        </div>
      </div>

      {/* Status and Action */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              status === "Accepted"
                ? "bg-green-200 text-green-900"
                : status === "Rejected"
                ? "bg-red-200 text-red-900"
                : "bg-yellow-200 text-yellow-900"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="flex space-x-4">
          {/* Status Dropdown */}
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border rounded-md px-4 py-2 text-sm text-gray-700 focus:ring focus:ring-blue-300"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {/* View Profile Button */}
          <button
            onClick={() => onViewProfile(applicant)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicantProfileModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/2 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{applicant.name}'s Profile</h2>
        <p className="text-sm text-gray-600">
          <strong>ID:</strong> {applicant.id}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Email:</strong> {applicant.email}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Phone:</strong> {applicant.phone || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Applied On:</strong>{" "}
          {new Date(applicant.appliedOn).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Status:</strong> {applicant.status}
        </p>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ApplicantList = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Static Dummy Data
  const applicants = [
    {
      id: "A1",
      name: "John Doe",
      appliedOn: "2025-01-10",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      status: "Pending",
    },
    {
      id: "A2",
      name: "Jane Smith",
      appliedOn: "2025-01-09",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      status: "Accepted",
    },
    {
      id: "A3",
      name: "Mike Johnson",
      appliedOn: "2025-01-08",
      email: "mikejohnson@example.com",
      phone: "555-123-4567",
      status: "Rejected",
    },
    {
      id: "A4",
      name: "Alice Brown",
      appliedOn: "2025-01-11",
      email: "alicebrown@example.com",
      phone: "444-333-2222",
      status: "Pending",
    },
  ];

  const handleViewProfile = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseProfile = () => {
    setSelectedApplicant(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-6">Applicants</h1>
      {applicants.map((applicant) => (
        <ApplicantCard
          key={applicant.id}
          applicant={applicant}
          onViewProfile={handleViewProfile}
        />
      ))}

      {/* Profile Modal */}
      {selectedApplicant && (
        <ApplicantProfileModal
          applicant={selectedApplicant}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
};

export default ApplicantList;
