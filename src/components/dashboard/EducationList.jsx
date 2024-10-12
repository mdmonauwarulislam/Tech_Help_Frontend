import { MdOutlineModeEdit } from "react-icons/md"

const EducationList = () => {
    return (
      <div className="px-10 py-4 flex justify-between items-start border border-gray-300 rounded-md shadow-md">
         <div>
         <h1 className="text-2xl font-semibold">University Name</h1>
          <h2 className="text-lg text-gray-700">Course name |<span> CGPA</span></h2>
          <h3 className="text-sm text-gray-500">Start year - End year</h3>
         </div>
         {/* Edit Button */}
      <div className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center">
      <MdOutlineModeEdit size={20} className="inline " />  
        <button className="">
         Edit
        </button>
      </div>
      </div>
    )
  }
  
  export default EducationList;