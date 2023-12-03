"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CalloutCard from "@components/CalloutCard";
const PromptGpt = ({ params }) => {
  console.log("params===>", params);
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return <p>Access Denied. Please signin to continue!</p>;
  }
  // Decode the URL component
  const { prompt } = params;
  console.log("Encoded Prompt:", prompt);

  const decodedPrompt = decodeURIComponent(prompt);
  console.log("Decoded Prompt:", decodedPrompt);

  //const encodedPrompt = encodeURIComponent(originalPrompt);
  // Construct the URL with encodedPrompt

  const [copied, setCopied] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const getPromptRes = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/get-prompt-res`,
        {
          prompt: decodedPrompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Use useEffect to handle state update after API call
      useEffect(() => {
        setContent(response.data);
        console.log("cotent====>", response.data);
      }, [response.data]);
  
      // Rest of your code handling the response
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the function to get prompt results
    getPromptRes();
  };

  const handleCopy = () => {
    setCopied(decodedPrompt);
    navigator.clipboard.writeText(decodedPrompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="felx flex-col flex-center realtive w-full">
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <h3 className="font-satoshi font-semibold text-gray-900">Prompt</h3>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === decodedPrompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt="copy_icon"
              width={12}
              height={12}
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {decodedPrompt}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="relative  my-4">
          <input
            type="text"
            placeholder="Enter your prompt here..."
            required
            className="search_input peer pr-10"
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white dark:text-black cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white dark:text-black cursor-pointer"
            >
              <path
                d="M7 11L12 6L17 11M12 18V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        content && <CalloutCard message={content} />
      )}
    </div>
  );
};

export default PromptGpt;
