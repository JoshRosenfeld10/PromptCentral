"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import axios from "axios";
import { PromptType } from "@models/prompt";

function ProfilePage() {
  const { data: session }: { data: any } = useSession();

  const [posts, setPosts] = useState<PromptType[]>([]);

  const handleEdit = () => {};

  const handleDelete = async () => {};

  const fetchPosts = async () => {
    const response = await axios.get(`/api/users/${session?.user.id}/posts`);
    const data = await response.data;

    setPosts(data);
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
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
}

export default ProfilePage;
