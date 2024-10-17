import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import AddProjectForm from "./AddProjectForm";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { GoPaperclip } from "react-icons/go";
import { MdOutlineVideoFile } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddProjectDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const isUpdatedProjects = useSelector(
    (state) => state.projects.isUpdatedProject
  );

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/getProjects`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [isUpdatedProjects]);

  const openModal = () => {
    setIsModalOpen(true);
    setProjectToEdit(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProjectToEdit(null);
  };

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/student/deleteProject/${projectToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Project deleted successfully!");
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectToDelete)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    } finally {
      setIsDeleteConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setProjectToDelete(null);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="mr-5">
            <FaFileAlt size={30} />
          </div>
          <div>
            <div className="text-lg font-semibold">Add Project Details</div>
            <div className="text-sm text-gray-500">
              Projects that you have worked on before
            </div>
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
      <AddProjectForm
        isOpen={isModalOpen}
        onClose={closeModal}
        projectToEdit={projectToEdit} 
        onProjectSaved={() => {
          closeModal();
        }}
      />

      {/* Project List */}
      {projects.length === 0 ? (
        <div className="p-4 text-gray-500">No projects available.</div>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            className="justify-between items-start px-10 mt-4 py-4 border border-gray-300 rounded-md shadow-md"
          >
            <div>
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">
                  {project.title || "Untitled"}
                </h1>
                {/* Edit and Delete Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(project)}
                    className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center"
                  >
                    <MdOutlineModeEdit size={20} className="inline " />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(project._id)}
                    className="py-1 px-3 border-2 gap-1 items-center flex border-red-500 rounded-md text-red-500 text-center"
                  >
                    <span>Delete</span>
                  </button>
                </div>
                
              </div>
              <ul className="list-disc list-inside text-gray-500">
                {project.description && project.description.length > 0 ? (
                  project.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))
                ) : (
                  <li>No description available.</li>
                )}
              </ul>
            </div>
            {/* Links */}
            <div className="mt-4 ">
              <div className="text-primary text-xl flex gap-3">
                {project.links && project.links.length > 0 ? (
                  project.links.map((link, index) => (
                    <Link key={index} to={link.value}>
                      {link.linkTitle === "repository" && <DiGithubBadge />}
                      {link.linkTitle === "deployed" && <RiGlobalLine />}
                      {link.linkTitle === "video" && <MdOutlineVideoFile />}
                      {link.linkTitle === "other" && <GoPaperclip />}
                    </Link>
                  ))
                ) : (
                  <span>No links available.</span>
                )}
              </div>
            </div>

            {/* Skills Used */}
            <div className="mt-4 flex space-x-2 text-gray-500">
              {project.skills && project.skills.length > 0 ? (
                project.skills.map((skill, index) => (
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
          </div>
        ))
      )}
      {/* Confirmation Modal for Deletion */}
      {isDeleteConfirmOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                      className="fixed inset-0 bg-black opacity-50" // Adjusted opacity to 50%
                      onClick={cancelDelete}
                    ></div>
                    <div className="bg-white p-5 rounded-md z-10 relative">
                      <h4 className="text-lg font-bold mb-4">
                        Confirm Deletion
                      </h4>
                      <p>Are you sure you want to delete this project?</p>
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

export default AddProjectDetails;
