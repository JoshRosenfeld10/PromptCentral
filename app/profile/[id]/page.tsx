"use client";

import Profile from "@components/Profile";
import { PromptType } from "@models/prompt";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function IDProfilePage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const username = searchParams.get("name") as string;

  const [userPosts, setUserPosts] = useState<PromptType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/api/users/${params.id}/posts`);
      const data = response.data;

      setUserPosts(data);
    };

    if (params.id) {
      fetchPosts();
    }
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s profile page. Feel free to explore their prompts!`}
      data={userPosts}
      handleDelete={() => {}}
      handleEdit={() => {}}
    />
  );
}

export default IDProfilePage;
