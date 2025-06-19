import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import socket from "../socket";
import PostCard from "./PostCard";

const Feed = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [commentBoxId, setCommentBoxId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const pageRef = useRef(0);
  const loaderRef = useRef();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      setPosts([]);
      pageRef.current = 0;
      setHasMore(true);
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await API.get(`/posts/feed?page=${pageRef.current}`);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...res.data]);
        pageRef.current += 1;
      }
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await API.post(`/posts/${postId}/like`, { userId: user.id });
    } catch (err) {
      console.error("Like error", err);
    }
  };

  const toggleCommentInput = (postId) => {
    setCommentBoxId(commentBoxId === postId ? null : postId);
    setCommentText("");
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;
    try {
      await API.post(`/posts/${postId}/comment`, {
        userId: user.id,
        userName: user.name,
        text: commentText,
      });
      setCommentText("");
      setCommentBoxId(null);
    } catch (err) {
      console.error("Comment error", err);
    }
  };

  useEffect(() => {
    socket.on("new-post", (post) => {
      setPosts((prev) => [post, ...prev]);
    });
    socket.on("post-updated", (updatedPost) => {
      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
    });
    return () => {
      socket.off("new-post");
      socket.off("post-updated");
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) fetchPosts();
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  if (!user) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-6 px-4">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onToggleComment={toggleCommentInput}
          onSubmitComment={handleComment}
          commentBoxId={commentBoxId}
          commentText={commentText}
          setCommentText={setCommentText}
        />
      ))}

      {hasMore ? (
        <div
          ref={loaderRef}
          className="text-center text-blue-500 py-6 font-medium animate-pulse"
        >
          ⏳ Loading more posts...
        </div>
      ) : (
        <p className="text-center text-gray-400 py-6">🎉 You've reached the end!</p>
      )}
    </div>
  );
};

export default Feed;
