"use client";

import Form from "@components/Form";
import { FormEvent, useEffect, useState } from "react";
import { Post } from "@components/Form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export interface EditPromptData {
  prompt: string;
  userId: string;
  tag: string;
}

function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id"); // Get ID from search params

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await axios.get<EditPromptData>(
        `/api/prompt/${promptId}`
      );
      const prompt: EditPromptData = response.data;

      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e: FormEvent) => {
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

export default EditPrompt;
