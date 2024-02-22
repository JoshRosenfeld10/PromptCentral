"use client";

import axios from "axios";
import { HTMLInputTypeAttribute, Key, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { PromptType } from "@models/prompt";

interface Props {
  data: PromptType[];
  handleTagClick: (tag: string) => void;
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
  const [searchResults, setSearchResults] = useState<PromptType[]>([]);

  const fetchPosts = async () => {
    const response = await axios.get("/api/prompt");
    const data = await response.data;

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i"); // 'i' for case-insesitive search

    return posts.filter(
      (item) =>
        regex.test(item.creator?.username as string) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    setSearchResults(filterPrompts(tag));
  };

  const handleSearchChange = (e: InputEvent) => {
    setSearchText((e.target as HTMLInputElement).value);
  };

  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search by tag or username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </div>
  );
}

export default Feed;
