"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const router = useRouter();
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const confirm_dialog = confirm("are you sure you want to delete this post");
    if (!confirm_dialog) return;
    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      const filteredPosts = posts.filter((x) => x._id != post._id);
      setposts(filteredPosts);
    } catch (error) {
      console.log(`failed to delete due to ${error}`);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/users/" + session?.user.id + "/posts");
      const data = await response.json();
      setposts(data);
      console.log(data);
    };
    console.log(session?.user.id);
    if (session?.user.id) fetchPosts();
  }, []);
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
