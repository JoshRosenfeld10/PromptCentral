"use client";

import Form from "@components/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

interface UpdatePromptData {
  prompt: string;
  userId: string;
  tag: string;
}

function UpdatePrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id") as string; // Get ID from search params

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await axios.get(`/api/prompt/${promptId}`);
      const prompt: UpdatePromptData = await response.data;

      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      const response = await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
        tag: post.tag,
      });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default UpdatePrompt;
