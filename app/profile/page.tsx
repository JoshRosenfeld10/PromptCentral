"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import axios from "axios";
import { PromptType } from "@models/prompt";

function ProfilePage() {
  const { data: session }: { data: any } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState<PromptType[]>([]);

  const handleEdit = (post: PromptType) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PromptType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await axios.delete(`/api/prompt/${post._id}`);
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
