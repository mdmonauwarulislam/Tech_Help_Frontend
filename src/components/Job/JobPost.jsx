import { useEffect, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";
import AddSkills from "./AddSkills";

const PostJob = () => {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: [{ requirement: "", responsibility: "" }],
    type: "Select Job Type",
    salary: [{ minimum: "", maximum: "" }],
    experience: "",
    workmode: "Select Work Mode",
    education: "Select Education Level",
    location: "",
    skills: [],
  });
const [skills,setSkills] = useState([]);
  const handleOpen = () => setOpen(!open);
  const openSkillsModal = () => setActiveModal("skills");
  const closeModal = () => setActiveModal(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.location) {
      toast.error("Please fill out all required fields.");
      return false;
    }
    if (formData.salary.some((s) => Number(s.minimum) > Number(s.maximum))) {
      toast.error("Minimum salary cannot exceed maximum salary.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      console.log(skills);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jobs/createjob`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        toast.success("Job posted successfully!");
        setFormData({
          title: "",
          description: [{ requirement: "", responsibility: "" }],
          type: "Select Job Type",
          salary: [{ minimum: "", maximum: "" }],
          experience: "",
          workmode: "Select Work Mode",
          education: "Select Education Level",
          location: "",
          skills: [],
        });
        handleOpen();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job.");
    }
  };
  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, skills }));
  }, [skills]);
  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-primary text-white py-2 px-4 rounded-md"
      >
        Post a Job
      </button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="px-8 pt-5"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div
          className="w-full flex justify-end"
          style={{ scrollbarWidth: "none" }}
        >
          <RxCross2
            className="h-6 w-6 text-primary cursor-pointer stroke-1 right-3 top-3 absolute"
            onClick={handleOpen}
          />
        </div>
        <div className="py-4 ">
          <h1 className="text-primary text-3xl font-semibold">
            Post a New Job
          </h1>
          <p className="text-xl font-medium text-gray-700 pb-2 border-b-2 border-primary">
            Find the best talent for your company
          </p>
        </div>
        <div
          className="overflow-y-scroll max-h-[75vh] pb-10"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Title */}
          <div>
            <label className="block text-xl mb-1 text-primary">Job Title</label>
            <input
              name="title"
              placeholder="Enter job title"
              value={formData.title}
              onChange={handleChange}
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          {/* Description */}
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">
              Description
            </label>
            {formData.description.map((desc, index) => (
              <div key={index} className="mb-2">
                <ReactQuill
                  value={desc.requirement}
                  onChange={(value)=>setFormData((prev)=>({...prev, description: [{requirement: value, responsibility: desc.responsibility}]}))}
                  theme="snow"
                  placeholder="Write down all your requirement here ..."
                  className="rounded-md border border-primary text-primary mb-1"
                />
                <ReactQuill
                  value={desc.responsibility}
                  onChange={(value)=>setFormData((prev)=>({...prev, description: [{requirement: desc.requirement, responsibility: value}]}))}
                  theme="snow"
                  placeholder="Write down all your responsibilities here ..."
                  className="rounded-md border border-primary text-primary mb-1"
                />
              </div>
            ))}
          </div>
          {/* job - type */}
          <div>
            <label className="block text-xl mb-1 text-primary">Job Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            >
              <option disabled>Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          {/* Salary */}
          <div className="mt-4">
            <label className="block text-xl mb-1 text-primary">Salary</label>
            {formData.salary.map((salary, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="number"
                  placeholder="Minimum"
                  value={salary.minimum}
                  onChange={(e) =>
                    setFormData((prev) => {
                      const updatedSalary = [...prev.salary];
                      updatedSalary[index].minimum = e.target.value;
                      return { ...prev, salary: updatedSalary };
                    })
                  }
                  className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
                />
                <input
                  type="number"
                  placeholder="Maximum"
                  value={salary.maximum}
                  onChange={(e) =>
                    setFormData((prev) => {
                      const updatedSalary = [...prev.salary];
                      updatedSalary[index].maximum = e.target.value;
                      return { ...prev, salary: updatedSalary };
                    })
                  }
                  className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
                />
              </div>
            ))}
          </div>
          {/* Educattion Level */}
          <div>
            <label className="block text-xl mb-1 text-primary">
              Education Level
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            >
              <option disabled>Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-xl mb-1 text-primary">Work Mode</label>
            <select
              name="workmode"
              value={formData.workmode}
              onChange={handleChange}
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            >
              <option disabled>Select Work Mode</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-primary text-xl">Skills</h1>
              <button
                onClick={openSkillsModal}
                className="px-4 font-semibold py-1 border border-primary rounded text-primary cursor-pointer"
              >
                Add Skills
              </button>
            </div>
            <p className="text-slate-600 mt-4">Skills listed here</p>
            {
              skills.map((skill) => (
                <div  className="flex gap-2 mt-2"> 
                  <p  className="bg-gray-200 px-4 py-2 rounded-full">{skill}</p>
                </div>
              ))
            }
          </div>
          {/* Modal for EditSkills */}
          {activeModal === "skills" && (
            <AddSkills isSkillFormOpen={true} onSkillFormClose={closeModal} skills={skills} setSkills={setSkills}/>
          )}

          {/* Experience */}
          <div>
            <label className="block text-xl mb-1 text-primary">
              Experience
            </label>
            <input
              name="experience"
              placeholder="Enter experience"
              value={formData.experience}
              onChange={handleChange}
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xl mb-1 text-primary">Location</label>
            <input
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
            />
          </div>
          {/* Submit */}
          <div className="flex justify-end">
            <button
              className="bg-primary py-2 px-4 mt-4 rounded-md text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PostJob;
