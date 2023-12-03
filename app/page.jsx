"use client";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";

const Home = () => {

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Explore & Exchange
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Generated Ideas</span>
      </h1>
      <p className="desc text-center ">
        Discover AI inspiration with PromptHub, a user-friendly tool for
        creating and sharing imaginative prompts. Dive into a world of
        creativity and collaboration effortlessly.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
