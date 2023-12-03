"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Pagination from "./Pagination";

const PromptCardList = ({
  data,
  handleTagClick,
  currentPage,
  postsPerPage,
}) => {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="mt-16 prompt_layout">
      {paginatedData.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`/api/prompt?page=${page}`);
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
        />
      )}
      <Pagination
        totalPages={Math.ceil(allPosts.length / postsPerPage)}
        currentPage={currentPage}
        paginate={(page) => {
          setCurrentPage(page);
          fetchPosts(page);
        }}
      />
    </section>
  );
};

export default Feed;
