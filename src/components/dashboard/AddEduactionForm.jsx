/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEducationForm = ({ isOpen, onClose }) => {
  const [educationType, setEducationType] = useState("");
  const [listOfdegree, setListOfdegree] = useState([]);
  const [college, setCollege] = useState({
    university: "",
    studyfield: "",
    degree: [],
    grade: "",
    startyear: "",
    endyear: "",
  });
  const [school, setSchool] = useState({
    schoolname: "",
    classof: "",
    passoutyear: "",
    finalgrade: "",
  });
  // handle degree option change
  const handleDegreeChange = (item) => {
    let selectedOptions;
    for (let i = 0; i < listOfdegree.length; i++) {
      if (listOfdegree[i]._id === item) {
        selectedOptions = listOfdegree[i];
        setCollege({ ...college, degree: selectedOptions });
      }
    }
  };

  // Get all Degree list from the database
  const handleGetListOfDegree = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/get-degree`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setListOfdegree(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // Handle education type change
  const handleEducationTypeChange = (e) => {
    setEducationType(e.target.value);
  };

  // Handle form submission
  const handleCollegeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/student/addCollegeEducation`,
        college,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Profile data:", response.data);
      if (response.status === 200) {
        toast.success("Education added successfully");
        onClose();
      }
      console.log("Profile data:", response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
    onClose();
  };

  //handle school form submission
  const handleSchoolSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/student/addSchoolEducation`,
        school,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Profile data:", response.data);
      if (response.status === 200) {
        toast.success("Education added successfully");
        onClose();
      }
      console.log("Profile data:", response.data);
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    }
    onClose();
  };
  useEffect(() => {
    handleGetListOfDegree();
  }, []);

  if (!isOpen) return null;
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

        <h2 className="text-2xl font-bold mb-4">Add Education Details</h2>

        <form onSubmit={educationType==='college'?handleCollegeSubmit:handleSchoolSubmit}>
          {/* Education Type */}
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
              <option value="">Select Education</option>
              <option value="college">College</option>
              <option value="school">School</option>
            </select>
          </div>

          {/* College Form */}
          {educationType === "college" && (
            <div className="pt-5">
              <div className="flex gap-10 justify-between">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="university">
                    University Name
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Your College Name"
                    type="text"
                    id="university"
                    name="university"
                    value={college.university}
                    onChange={(e) =>
                      setCollege({ ...college, university: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="studyfield">
                    Field of Study
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Field of Study"
                    type="text"
                    id="studyfield"
                    name="studyfield"
                    value={college.studyfield}
                    onChange={(e) =>
                      setCollege({ ...college, studyfield: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-10 pt-5 justify-between">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="degree">
                    Degree
                  </label>
                  <select
                    className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                    id="domain"
                    onChange={(e) => handleDegreeChange(e.target.value)}
                    required
                  >
                    {Array.isArray(listOfdegree) &&
                      listOfdegree.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.degree}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="grade">
                    Grade (Out of 10)
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Your Grade"
                    type="text"
                    id="grade"
                    name="grade"
                    value={college.grade}
                    onChange={(e) =>
                      setCollege({ ...college, grade: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-10 pt-5 justify-between">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="startyear">
                    Start Year
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Start Year"
                    type="text"
                    id="startyear"
                    name="startyear"
                    value={college.startyear}
                    onChange={(e) =>
                      setCollege({ ...college, startyear: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="endyear">
                    End Year
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type End Year"
                    type="text"
                    id="endyear"
                    name="endyear"
                    value={college.endyear}
                    onChange={(e) =>
                      setCollege({ ...college, endyear: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* School Form */}
          {educationType === "school" && (
            <div className="pt-5">
              <div className="flex gap-10 justify-between">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="schoolname">
                    School Name
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Your School Name"
                    type="text"
                    id="schoolname"
                    name="schoolname"
                    value={school.schoolname}
                    onChange={(e) =>
                      setSchool({ ...school, schoolname: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="class">
                    Class
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Your Class"
                    type="text"
                    id="classof"
                    name="classof"
                    value={school.classof}
                    onChange={(e) =>
                      setSchool({ ...school, classof: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-10 pt-5 justify-between">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="passoutyear">
                    Passout Year
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Passout Year"
                    type="text"
                    id="passoutyear"
                    name="passoutyear"
                    value={school.passoutyear}
                    onChange={(e) =>
                      setSchool({ ...school, passoutyear: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold" htmlFor="finalgrade">
                    Final Grade
                  </label>
                  <input
                    className="py-2 px-4 rounded-md border border-gray-300 outline-none focus:border-techBlue-500"
                    placeholder="Type Final Grade"
                    type="text"
                    id="finalgrade"
                    name="finalgrade"
                    value={school.finalgrade}
                    onChange={(e) =>
                      setSchool({ ...school, finalgrade: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-10 gap-10 flex justify-end">
            <button onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            {
              educationType === "college" ? (
                <button
                  onClick={handleCollegeSubmit}

                  className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
                >
                  Save College
                </button>
              ) : (
                <button
                  onClick={handleSchoolSubmit}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
                >
                  Save School
                </button>
              )
            }
          
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEducationForm;
