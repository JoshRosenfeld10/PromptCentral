"use client";

import axios from "axios";
import { Key, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { PromptType } from "@models/prompt";

interface Props {
  data: PromptType[];
  handleTagClick: () => void;
}

const PromptCardList = ({ data, handleTagClick }: Props) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id as any}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<PromptType[]>([]);

  const handleSearchChange = () => {};

  const fetchPosts = async () => {
    const response = await axios.get("/api/prompt");
    const data = await response.data;

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search by tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </div>
  );
}

export default Feed;
