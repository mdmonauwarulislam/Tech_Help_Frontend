import React, { useState } from "react";
import { FaReply, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const CommentSection = ({ blogId, comments, onCommentAdded, refetch }) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog/${blogId}/comment`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onCommentAdded(response.data.data);
      setNewComment("");
      toast.success("Comment added!");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/blog/${blogId}/comment/${commentId}/reply`,
        { text: replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplyingTo(null);
      setReplyText("");
      toast.success("Reply added!");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add reply");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-semibold mb-3">Comments ({comments.length})</h3>

      {/* Add new comment */}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <FaUserCircle className="text-2xl text-gray-400" />
          </div>
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              rows="2"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Post
            </button>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border-b pb-3 last:border-0">
            <div className="flex gap-2">
              <div className="flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${
                    comment.user?.profilePicture || "default-profile.png"
                  }`}
                  alt={comment.user?.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="font-semibold text-sm">
                  {comment.user?.username}
                </div>
                <div className="text-xs text-gray-500">
                  {moment(comment.createdAt).fromNow()}
                </div>
                <p className="mt-1 text-sm">{comment.text}</p>

                <button
                  onClick={() =>
                    setReplyingTo(
                      replyingTo === comment._id ? null : comment._id
                    )
                  }
                  className="mt-1 flex items-center text-xs text-primary hover:underline"
                >
                  <FaReply className="mr-1" /> Reply
                </button>

                {/* Reply form */}
                {replyingTo === comment._id && (
                  <div className="mt-2 ml-4">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0">
                        <FaUserCircle className="text-xl text-gray-400" />
                      </div>
                      <div className="flex-grow">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                          rows="2"
                        />
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handleReplySubmit(comment._id)}
                            className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm"
                          >
                            Post
                          </button>
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 border rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies?.length > 0 && (
                  <div className="mt-3 space-y-3 ml-4 border-l-2 pl-4">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="border-b pb-2 last:border-0"
                      >
                        <div className="flex gap-2">
                          <div className="flex-shrink-0">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/uploads/${
                                reply.user?.profilePicture ||
                                "default-profile.png"
                              }`}
                              alt={reply.user?.username}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-xs">
                              {reply.user?.username}
                            </div>
                            <div className="text-xs text-gray-500">
                              {moment(reply.createdAt).fromNow()}
                            </div>
                            <p className="mt-1 text-xs">{reply.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
