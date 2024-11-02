import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostJob = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Select Job Type",
    salary: { minimum: "", maximum: "" },
    experience: "",
    workmode: "Select Work Mode", 
    education: "Select Education Level", 
    location: "",
    skills: [""],
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
    handleOpen();
  };

  return (
    <>
      <button onClick={handleOpen}>Post a job</button>
      <Dialog size="lg" open={open} handler={handleOpen} className="px-8 pt-5">
        <div className="w-full flex justify-end">
          <RxCross2
            className="h-6 w-6 text-primary cursor-pointer stroke-1 right-3 top-3 absolute"
            onClick={handleOpen}
          />
        </div>
        <div className="py-4 ">
          <h1 className="text-primary border-primary text-3xl font-semibold">
            Post a New Job
          </h1>
          <p className="text-xl font-medium text-gray-700 pb-2 border-b-2 border-primary">Find the best talent for your company</p>
        </div>
        <div className="overflow-y-scroll max-h-[75vh] pb-10" style={{ scrollbarWidth: "none" }}>
          <div>
            <div className="w-full">
              <label className="block text-xl mb-1 text-primary">Job Title</label>
              <input
                name="title"
                placeholder="Enter job title"
                value={formData.title}
                onChange={handleChange}
                required
                className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
              />
            </div>
            <div className="mt-4">
              <label className="block text-xl mb-1 text-primary">Description</label>
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                theme="snow"
                placeholder="Enter job description..."
                className="rounded-md w-full  border border-primary text-primary"
              />
            </div>
            <div className="mt-4">
              <label className="block text-xl mb-1 text-primary">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="py-2 rounded-md px-3 w-full border border-primary text-primary outline-none"
              >
                <option value="Select Job Type" disabled> Select Job Type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="mt-4">
              <h1 className="block text-xl mb-1 text-primary">Salary</h1>
              <div className="flex gap-4">
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Enter minimum salary"
                    value={formData.salary.minimum}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary: { ...prev.salary, minimum: e.target.value },
                      }))
                    }
                    required
                    className="py-2 rounded-md px-3 w-full outline-none  border border-primary text-primary"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Enter maximum salary"
                    value={formData.salary.maximum}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary: { ...prev.salary, maximum: e.target.value },
                      }))
                    }
                    required
                    className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
                  />
                </div>
              </div>
            </div>
            <div className="text-primary mt-4">
              <label className="block text-xl mb-1 text-primary">Experience (in years)</label>
              <input
                type="number"
                placeholder="Enter experience required"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
              />
            </div>
            <div className="text-primary mt-4">
              <label className="block text-xl mb-1 text-primary">Work Mode</label>
              <select
                name="workmode"
                placeholder="Select Work Mode"
                value={formData.workmode}
                onChange={handleChange}
                required
                className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
              >
                <option value="Select Work Mode" disabled>Select Work Mode</option>
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="text-primary mt-4">
              <label className="block mb-2">Education Level</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
              >
                <option value="Select Education Level" disabled>Select Education Level</option>
                <option value="bachelors">Bachelors</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="text-primary mt-4">
              <label className="block text-xl mb-1 text-primary">Location</label>
              <input
                name="location"
                placeholder="Enter job location"
                value={formData.location}
                onChange={handleChange}
                required
                className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
              />
            </div>
            <div className="text-primary mt-4">
              <h1>Skills</h1>
              {formData.skills.map((skill, index) => (
                <div key={index} className="mb-2">
                  <input
                    value={skill}
                    placeholder="Enter skill"
                    onChange={(e) => {
                      const updatedSkills = [...formData.skills];
                      updatedSkills[index] = e.target.value;
                      setFormData({ ...formData, skills: updatedSkills });
                    }}
                    className="py-2 rounded-md px-3 w-full outline-none border border-primary text-primary"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button className=" bg-primary py-2 px-4 mt-4 rounded-md text-white" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PostJob;
