"use client";

import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const OProfile = ({ params }) => {
  const { id } = params;
  console.log(id);
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/users/" + id + "/posts");
      const data = await response.json();
      setposts(data);
      console.log(data);
    };

    if (id) fetchPosts();
  }, []);
  return (
    <Profile
      name={posts[0]?.creator.username}
      desc={`Welcome to ${posts[0]?.creator.username} profile page`}
      data={posts}
      handleDelete={() => {}}
      handleEdit={() => {}}
    />
  );
};

export default OProfile;
