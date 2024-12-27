import { useState, useEffect } from "react";
import axios from "axios";
import CreateBlog from "../components/Blog/CreateBlog";
import noData from "../assets/noDataSvg.svg";
import { useSelector } from "react-redux";

function MyBlog() {
  const [activeButton, setActiveButton] = useState("Publish");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const isUpdatedBlog = useSelector((state) => state.blog.isBlogUpdated);

  // Fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/getblogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        setBlogs(response.data.data);
      } else {
        console.error("Error: Data fetch was not successful");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [isUpdatedBlog]);

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]+>/g, "");
  };

  const toggleExpand = (id) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="px-4 pt-3 py-5 w-10/12 mx-auto">
        <h1 className="m-auto text-blue-700 font-bold">My Blogs</h1>
        <div className="flex justify-between border-b-2 pb-3 pt-3">
          <div className="flex gap-4">
            <button
              className={`rounded-md py-2 px-4 text-center text-sm transition-all shadow-md hover:shadow-lg ${
                activeButton === "Publish"
                  ? "bg-primary text-white"
                  : "bg-[#e5e5e5] text-[#898989]"
              }`}
              onClick={() => setActiveButton("Publish")}
            >
              Publish
            </button>
            <button
              className={`rounded-md py-2 px-4 text-center text-sm transition-all shadow-md hover:shadow-lg ${
                activeButton === "Draft"
                  ? "bg-primary text-white"
                  : "bg-[#e5e5e5] text-[#898989]"
              }`}
              onClick={() => setActiveButton("Draft")}
            >
              Draft
            </button>
          </div>
          <div>
            <CreateBlog />
          </div>
        </div>
      </div>

      <div
        className="max-h-[500px] overflow-y-auto w-10/12 mx-auto"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {" "}
        {/* Adjust max height as needed */}
        {isLoading ? (
          <p className="text-center mt-5">Loading...</p>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{blog.category}</p>
                <p className="text-gray-700 mb-2">
                  {expandedBlogs[blog._id]
                    ? stripHtmlTags(blog.content)
                    : `${stripHtmlTags(blog.content).slice(0, 100)}...`}
                </p>
                <button
                  onClick={() => toggleExpand(blog._id)}
                  className="text-primary underline"
                >
                  {expandedBlogs[blog._id] ? "Show Less" : "Read More"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-5">
            <img src={noData} alt="No Data" />
            <p className="text-center">No data is Available in this section</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MyBlog;
