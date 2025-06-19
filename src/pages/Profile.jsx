import React, { useEffect, useState } from "react";
import API from "../api";
import socket from "../socket";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUserPosts = async () => {
    const res = await API.get(`/posts/user/${user.id}`);
    setPosts(res.data);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await API.delete(`/posts/${postId}`);
    }
  };

  const handleEdit = (post) => {
    setEditId(post._id);
    setEditContent(post.content);
  };

  const submitEdit = async (postId) => {
    await API.put(`/posts/${postId}/edit`, { content: editContent });
    setEditId(null);
  };

  useEffect(() => {
    fetchUserPosts();
    socket.on("post-updated", fetchUserPosts);
    socket.on("post-deleted", fetchUserPosts);

    return () => {
      socket.off("post-updated", fetchUserPosts);
      socket.off("post-deleted", fetchUserPosts);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="bg-white shadow rounded p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{post.authorName}</h3>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-500 text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
          {editId === post._id ? (
            <>
              <textarea
                className="w-full border p-2 mt-2"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button
                onClick={() => submitEdit(post._id)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-700 my-2">{post.content}</p>
              {post.image && (
                <img src={post.image} className="rounded" alt="post" />
              )}
            </>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
