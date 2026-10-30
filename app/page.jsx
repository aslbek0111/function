
"use client";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Postlarni yuklashda xato:", error);
    }
  }

  async function addPost(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return alert("Maydonni to'ldiring");
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      return alert("Post qo'shishda xato yuz berdi");
    }

    setTitle("");
    setDescription("");
    fetchPosts();
  }

  async function deletePost(id) {
    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      return alert("Postni o'chirishda xato yuz berdi");
    }

    fetchPosts();
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-5 text-2xl font-bold">Posts</h1>

      <form onSubmit={addPost} className="mb-6 flex flex-col gap-3">
        <input
          className="rounded border p-3"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="rounded border p-3"
          placeholder="Post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="rounded bg-blue-600 p-3 text-white">
          Add Post
        </button>
      </form>

      {posts.map((post) => (
        <div
          key={post.id}
          className="mb-3 rounded border p-4"
        >
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.description}</p>

          <button
            onClick={() => deletePost(post.id)}
            className="mt-3 rounded bg-red-600 px-3 py-2 text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
