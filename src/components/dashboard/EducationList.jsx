import { MdOutlineModeEdit } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { RiGlobalLine } from "react-icons/ri";
import { TbLivePhotoFilled } from "react-icons/tb";
import { GoPaperclip } from "react-icons/go";
import { MdOutlineVideoFile } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";
import { Link } from "react-router-dom";

const EducationList = () => {
  return (
    <div className=" flex justify-between items-start px-10 py-4 border border-gray-300 rounded-md shadow-md">
      <div>

      <div>
        <h1 className="text-2xl font-semibold">Personal Portfolio</h1>
        
        <ul className="list-disc list-inside text-gray-500">
          <li>Implementation of basic knowledge</li>
          <li>Structure using HTML, CSS for designing and UI, then made responsive using basic JavaScript</li>
          <li>By using basic skills (HTML, CSS, JavaScript), built a portfolio website for personal use</li>
        </ul>
      </div>


      {/* Links */}
      <div className="mt-4 ">
        <div className="text-primary text-xl flex gap-3">
        <Link><DiGithubBadge/></Link>
        <Link><FaLink/></Link>
        <Link><RiGlobalLine/></Link>
        <Link><GoPaperclip/></Link>
        <Link><MdOutlineVideoFile/></Link>
        </div>
        <div className="text-red-700  mt-4 font-semibold">
          <Link>Add Link  <TbLivePhotoFilled className="inline"/></Link>
        </div>
        
      </div>

      {/* Skills Used */}
      <div className="mt-4 flex space-x-2 text-gray-500">
        <span className="px-3 py-1 bg-gray-100 rounded-full">HTML</span>
        <span className="px-3 py-1 bg-gray-100 rounded-full">CSS</span>
        <span className="px-3 py-1 bg-gray-100 rounded-full">JavaScript</span>
      </div>
      </div>

      {/* Edit Button */}
      <div className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center">
      <MdOutlineModeEdit size={20} className="inline " />  
        <button className="">
         Edit
        </button>
      </div>
    </div>
  );
};

export default EducationList;
