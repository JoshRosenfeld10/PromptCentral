"use client";

import Form from "@components/Form";
import { FormEvent, useState } from "react";
import { Post } from "@components/Form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionType } from "@app/api/auth/[...nextauth]/route";

export interface CreatePromptData {
  prompt: string;
  userId: string;
  tag: string;
}

function CreatePrompt() {
  const router = useRouter();
  const { data: session }: { data: SessionType | null } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await axios.post<CreatePromptData>("/api/prompt/new", {
        prompt: post.prompt,
        userId: session?.user?.id,
        tag: post.tag,
      });

      if (response.status === 201) {
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt;
