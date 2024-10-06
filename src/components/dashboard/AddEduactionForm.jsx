/* eslint-disable react/prop-types */
import { useState } from 'react';

const AddEducationForm = ({ isOpen, onClose }) => {
  const [educationType, setEducationType] = useState('');

  if (!isOpen) return null;

  const handleEducationTypeChange = (e) => {
    setEducationType(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background blur */}
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white p-10 shadow-md rounded-md z-10 relative w-11/12 md:w-2/3 lg:w-2/5 max-h-screen overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-4xl top-3 right-4 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <div>
          <label className="font-semibold" htmlFor="educationType">
            Select Education Type
          </label>
          <select
            className="py-2 px-4 ml-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
            id="educationType"
            name="educationType"
            onChange={handleEducationTypeChange}
            value={educationType}
          >
            {/* Scrollable dropdown */}
            <option value="">Select Education</option>
            <option value="college">College</option>
            <option value="school">School</option>
          </select>
        </div>

        {/* Conditionally render College form */}
        {educationType === 'college' && (
          <form action="" className="pt-5">
            <div className="flex gap-10 justify-between">
              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="university">University Name</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Your College Name"
                  type="text"
                  id="university"
                  name="university"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="studyfield">Field of Study</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Field of Study"
                  type="text"
                  id="studyfield"
                  name="studyfield"
                  required
                />
              </div>
            </div>

            <div className="flex gap-10 pt-5 justify-between">
              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="degree">Degree</label>
                <select
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  name="degree"
                  id="degree"
                >
                  <option value="">Select your Degree</option>
                  <option value="btech">B.Tech or B.E</option>
                  <option value="bsc">B.Sc</option>
                  <option value="diploma">Diploma</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="grade">Grade (Out of 10)</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Your Grade"
                  type="text"
                  id="grade"
                  name="grade"
                  required
                />
              </div>
            </div>

            <div className="flex gap-10 pt-5 justify-between">
              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="startyear">Start Year</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Start Year"
                  type="text"
                  id="startyear"
                  name="startyear"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="endyear">End Year</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type End Year"
                  type="text"
                  id="endyear"
                  name="endyear"
                  required
                />
              </div>
            </div>
          </form>
        )}

        {/* Conditionally render School form */}
        {educationType === 'school' && (
          <form action="" className="pt-5">
            <div className="flex gap-10 justify-between">
              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="schoolname">School Name</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Your School Name"
                  type="text"
                  id="schoolname"
                  name="schoolname"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="class">Class</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Your Class"
                  type="text"
                  id="class"
                  name="class"
                  required
                />
              </div>
            </div>

            <div className="flex gap-10 pt-5 justify-between">
              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="passoutyear">Passout Year</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Passout Year"
                  type="text"
                  id="passoutyear"
                  name="passoutyear"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="finalgrade">Final Grade</label>
                <input
                  className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                  placeholder="Type Final Grade"
                  type="text"
                  id="finalgrade"
                  name="finalgrade"
                  required
                />
              </div>
            </div>
          </form>
        )}

        <div className="pt-5 gap-10 flex justify-end">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none">
            Save Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEducationForm;
