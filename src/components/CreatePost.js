import React, { useState } from "react";
import API from "../api";
import socket from "../socket";

const CreatePost = ({ user }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("authorId", user.id);
      formData.append("authorName", user.name);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      socket.emit("new-post", res.data);
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 transition hover:shadow-lg">
      <textarea
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows="4"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <label className="cursor-pointer text-sm text-blue-600 hover:underline">
          📷 Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <p className="text-sm text-gray-500 truncate max-w-xs">
            {image.name}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || (!content.trim() && !image)}
          className={`px-4 py-2 text-white text-sm rounded-lg transition ${
            loading || (!content.trim() && !image)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
