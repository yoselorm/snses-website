import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleBlog } from "../redux/BlogSlice";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBlog, loading, error } = useSelector((state) => state.blogs);
  console.log(singleBlog)

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBlog(id));
    }
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-gray-500">Loading blog...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  if (!singleBlog)
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-gray-500">No blog found.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 font-garamond">
      {/* Blog Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {singleBlog.title}
        </h1>
        <p className="text-sm text-gray-500">
          By {singleBlog.author || "Admin"} ·{" "}
          {new Date(singleBlog.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Blog Image */}
      {singleBlog.image && (
        <div className="w-full mb-8">
          <img
            src={singleBlog.image}
            alt={singleBlog.title}
            className="w-full h-[400px] object-cover shadow-md"
          />
        </div>
      )}

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: singleBlog.body }}
      />
    </div>
  );
};

export default BlogDetail;
