import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { CiShare2, CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleLike, addComment, incrementShare } from "../../api"; // Import your API functions

const BlogCard = ({ item }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(item?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState(item?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => {
      toast(prev ? "Removed from bookmarks" : "Bookmarked!");
      return !prev;
    });
  };

  // Fetch updated likes from API
  const handleLike = async () => {
    try {
      const updatedLikes = await toggleLike(item?.id);
      setLikes(updatedLikes.likes);
      setHasLiked((prev) => !prev);
      toast(hasLiked ? "Like removed" : "You liked this post!");
    } catch (error) {
      toast.error("Failed to toggle like: " + error.message);
    }
  };

  // Handle comment toggle
  const handleCommentToggle = () => {
    setShowCommentInput((prev) => !prev);
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const updatedComments = await addComment(item?.id, newComment);
        setComments(updatedComments);
        setNewComment("");
        toast("Comment added!");
      } catch (error) {
        toast.error("Failed to add comment: " + error.message);
      }
    }
  };

  // Handle share action
  const handleShare = async () => {
    try {
      await incrementShare(item?.id);
      if (navigator.share) {
        navigator
          .share({
            title: item?.title,
            text: stripHtmlTags(item?.content).slice(0, 100),
            url: window.location.href,
          })
          .then(() => toast("Blog shared!"))
          .catch((error) => toast.error("Share failed: " + error.message));
      } else {
        toast("Sharing not supported on this browser!");
      }
    } catch (error) {
      toast.error("Failed to increment share count: " + error.message);
    }
  };

  // Toggle content visibility (Show more/Show less)
  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  const stripHtmlTags = (html) => {
    return html ? html.replace(/<[^>]+>/g, "") : "";
  };

  return (
    <div className="space-y-3">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${
              item?.user?.profilePicture
            }`}
            className="w-full h-full rounded-full object-cover"
            alt="profile picture"
          />
        </div>
        <div>
          <h1 className="font-bold text-[14px]">{item?.user?.username}</h1>
          <p className="text-xs text-[#929292]">Role</p>
        </div>
      </div>

      {/* Blog Image */}
      <div className="card rounded-lg">
        <div className="image h-64">
          <img
            src={item?.image}
            className="h-full w-full object-fit rounded-lg"
            alt={item?.title}
          />
        </div>
      </div>

      {/* Blog Content */}
      <Link to={`/blog/${item?.id}/blog-post-details`} className="content">
        <div>
          <p>
            <span className="font-bold text-[16px]">{item?.category}</span>:{" "}
            <span className="text-sm text-[#929292]">
              {new Date(item?.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold line-clamp-3">
            {isExpanded
              ? stripHtmlTags(item?.content)
              : `${stripHtmlTags(item?.content).slice(0, 150)}...`}
          </h1>
        </div>
        {/* Show More / Show Less button */}
        <div
          className="text-sm text-blue-600 cursor-pointer"
          onClick={toggleContent}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </div>
      </Link>

      {/* Like, Comment, Share & Bookmark */}
      <div className="share">
        <ul className="flex gap-4">
          <li onClick={handleLike}>
            <AiOutlineLike
              className={`text-2xl cursor-pointer ${
                hasLiked ? "text-red-500" : "text-[#0b2f9f]"
              }`}
            />
            <span className="text-sm ml-1">{likes}</span>
          </li>
          <li onClick={handleCommentToggle}>
            <FaRegComments className="text-2xl text-[#0b2f9f] cursor-pointer" />
            <span className="text-sm ml-1">{comments.length}</span>
          </li>
          <li onClick={handleShare}>
            <CiShare2 className="text-2xl text-[#0b2f9f] cursor-pointer" />
          </li>
          <li onClick={handleBookmarkClick} className="cursor-pointer">
            {isBookmarked ? (
              <FaBookmark className="text-2xl text-[#0b2f9f]" />
            ) : (
              <CiBookmark className="text-2xl text-[#0b2f9f]" />
            )}
          </li>
        </ul>
      </div>

      {/* Comment Section */}
      {showCommentInput && (
        <div className="comments mt-4">
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="text-sm text-gray-700">
                {comment}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
