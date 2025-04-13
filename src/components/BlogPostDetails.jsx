import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComments, FaBookmark, FaShare, FaReply } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import CommentSection from "../components/CommentSection";
import RelatedBlogs from "../components/RelatedBlogs";

const BlogPostDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/blog/getallblogs`
        );
        const foundBlog = response.data.data.find((b) => b._id === id);

        if (foundBlog) {
          setBlog(foundBlog);
          setLikes(foundBlog.likes?.length || 0);
          setHasLiked(
            foundBlog.likes?.includes(localStorage.getItem("userId"))
          );
          setIsBookmarked(
            foundBlog.bookmarks?.includes(localStorage.getItem("userId"))
          );

          // Fetch related blogs (same category)
          const related = response.data.data
            .filter((b) => b._id !== id && b.category === foundBlog.category)
            .slice(0, 3);
          setRelatedBlogs(related);
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        toast.error("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikes(response.data.data.likes);
      setHasLiked(response.data.data.isLiked);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle like");
    }
  };

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog/${id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsBookmarked(response.data.data.isBookmarked);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle bookmark");
    }
  };

  const handleShare = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/blog/${id}/share`);

      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.content.slice(0, 100),
          url: window.location.href,
        });
        toast.success("Blog shared successfully!");
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Failed to share blog");
      }
    }
  };

  const handleCommentAdded = (newComment) => {
    setBlog((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center py-8">Blog not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

            <div className="flex items-center gap-3 mb-6">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${
                  blog.user?.profilePicture
                }`}
                alt={blog.user?.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold">{blog.user?.username}</h2>
                <p className="text-sm text-gray-500">
                  {moment(blog.createdAt).format("MMMM D, YYYY")} ·{" "}
                  {blog.category}
                </p>
              </div>
            </div>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto rounded-lg mb-6"
              />
            )}

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="flex justify-between items-center mt-8 pt-4 border-t">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  {hasLiked ? (
                    <AiFillLike className="text-2xl text-primary" />
                  ) : (
                    <AiOutlineLike className="text-2xl" />
                  )}
                  <span>{likes}</span>
                </button>

                <button className="flex items-center gap-1 text-gray-600 hover:text-primary">
                  <FaRegComments className="text-xl" />
                  <span>{blog.comments?.length || 0}</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleBookmark}
                  className="flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  {isBookmarked ? (
                    <FaBookmark className="text-xl text-primary" />
                  ) : (
                    <CiBookmark className="text-xl" />
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  <FaShare className="text-xl" />
                  <span>{blog.shares || 0}</span>
                </button>
              </div>
            </div>
          </article>

          {/* Comment Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <CommentSection
              blogId={id}
              comments={blog.comments || []}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        </div>

        {/* Sidebar with related blogs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Related Blogs</h2>
            <div className="space-y-4">
              {relatedBlogs.length > 0 ? (
                relatedBlogs.map((relatedBlog) => (
                  <RelatedBlogs key={relatedBlog._id} blog={relatedBlog} />
                ))
              ) : (
                <p className="text-gray-500">No related blogs found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;
