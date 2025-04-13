import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComments, FaBookmark } from "react-icons/fa";
import { CiShare2, CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import CommentSection from "../CommentSection";
import { toggleLike, toggleBookmark, addComment, shareBlog } from "../../api";

const BlogCard = ({ item, refetch }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(item?.likes?.length || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState(item?.comments || []);

  // Check initial like and bookmark status
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setHasLiked(item?.likes?.includes(userId));
      setIsBookmarked(item?.bookmarks?.includes(userId));
    }
  }, [item]);

  const stripHtmlTags = (html) => {
    return html ? html.replace(/<[^>]+>/g, "") : "";
  };

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      const response = await toggleLike(item._id);
      setLikes(response.data.likes);
      setHasLiked(response.data.isLiked);
      toast.success(response.message);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await toggleBookmark(item._id);
      setIsBookmarked(response.data.isBookmarked);
      toast.success(response.message);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShare = async () => {
    try {
      await shareBlog(item._id);
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: stripHtmlTags(item.content).slice(0, 100),
          url: `${window.location.origin}/blog/${item._id}/blog-post-details`,
        });
        toast.success("Blog shared successfully!");
      } else {
        navigator.clipboard.writeText(
          `${window.location.origin}/blog/${item._id}/blog-post-details`
        );
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Failed to share blog");
      }
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="space-y-3 p-4 border rounded-lg shadow-sm">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${
              item?.user?.profilePicture
            }`}
            className="w-full h-full rounded-full object-cover"
            alt="profile"
          />
        </div>
        <div>
          <h1 className="font-bold text-[14px]">{item?.user?.username}</h1>
          <p className="text-xs text-[#929292]">
            {moment(item.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <Link to={`/blog/${item._id}/blog-post-details`}>
        <div className="mt-2">
          <span className="font-bold text-primary">{item.category}</span>
          <h1 className="text-xl font-bold mt-1">{item.title}</h1>
          <p className="mt-2 text-gray-700">
            {isExpanded
              ? stripHtmlTags(item.content)
              : `${stripHtmlTags(item.content).slice(0, 150)}...`}
            {item.content.length > 150 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleContent();
                }}
                className="text-primary ml-2"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </p>
        </div>
      </Link>

      {/* Blog Image */}
      {item.image && (
        <div className="mt-3 rounded-lg overflow-hidden">
          <img
            src={item.image}
            className="w-full h-auto max-h-64 object-cover"
            alt={item.title}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-3 border-t">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-gray-600 hover:text-primary"
        >
          {hasLiked ? (
            <AiFillLike className="text-xl text-primary" />
          ) : (
            <AiOutlineLike className="text-xl" />
          )}
          <span>{likes}</span>
        </button>

        <button
          onClick={() => setShowCommentSection(!showCommentSection)}
          className="flex items-center gap-1 text-gray-600 hover:text-primary"
        >
          <FaRegComments className="text-xl" />
          <span>{comments.length}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-gray-600 hover:text-primary"
        >
          <CiShare2 className="text-xl" />
          <span>{item.shares || 0}</span>
        </button>

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
      </div>

      {/* Comment Section */}
      {showCommentSection && (
        <CommentSection
          blogId={item._id}
          comments={comments}
          onCommentAdded={handleCommentAdded}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default BlogCard;
