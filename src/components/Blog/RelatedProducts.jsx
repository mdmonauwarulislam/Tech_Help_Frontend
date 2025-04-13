import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const RelatedBlogs = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}/blog-post-details`}
      className="block hover:bg-gray-50 p-2 rounded-lg transition"
    >
      <div className="flex items-start gap-3">
        {blog.image && (
          <div className="flex-shrink-0 w-16 h-16">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-sm line-clamp-2">{blog.title}</h3>
          <p className="text-xs text-gray-500 mt-1">
            {moment(blog.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedBlogs;
