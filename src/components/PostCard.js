import React from "react";

const PostCard = ({
  post,
  onLike,
  onToggleComment,
  onSubmitComment,
  commentBoxId,
  commentText,
  setCommentText,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 transition hover:shadow-lg">
      {/* Author */}
      <h3 className="text-xl font-semibold text-gray-800">
        {post.authorName}
      </h3>

      {/* Content */}
      <p className="text-gray-700 mt-2 text-base leading-relaxed">
        {post.content}
      </p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full h-auto rounded-lg mt-4"
        />
      )}

      {/* Actions */}
      <div className="flex gap-6 mt-4 text-gray-600 text-sm">
        <button
          onClick={() => onLike(post._id)}
          className="hover:text-blue-600 transition"
        >
          👍 Like ({post.likes?.length || 0})
        </button>
        <button
          onClick={() => onToggleComment(post._id)}
          className="hover:text-green-600 transition"
        >
          💬 Comments ({post.comments?.length || 0})
        </button>
      </div>

      {/* Comment Input */}
      {commentBoxId === post._id && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={() => onSubmitComment(post._id)}
            className="mt-2 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      )}

      {/* Comments */}
      <div className="mt-4 space-y-2">
        {post.comments?.map((c, i) => (
          <p key={i} className="text-sm text-gray-700 pl-2 border-l-4 border-gray-200">
            <span className="font-medium text-gray-800">{c.userName}:</span>{" "}
            {c.text}
          </p>
        ))}
      </div>

      {/* Timestamp */}
      <p className="text-xs text-gray-400 mt-4">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default PostCard;
