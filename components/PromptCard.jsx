"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
  

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };


  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const promptGpt = () => { 
 
    router.push(`/prompt-gpt/${post.prompt}`); 
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            
          </div>
        </div>

        <div className="gpt_btn" onClick={promptGpt}> 
        {/* onclick on particular promptcard to go to "/prompt-gpt" and display the prompt  in the text area   */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 28 28"
          >
            <path
              fill="#93999F"
              fill-rule="evenodd"
              d="M14.668 5.416a.925.925 0 00-.923.927c0 .512.413.927.923.927s.924-.415.924-.927a.926.926 0 00-.924-.927zm-2.336.927A2.34 2.34 0 0114.668 4a2.34 2.34 0 012.337 2.343c0 1.1-.755 2.022-1.773 2.275v2.22c1.586.001 2.844.01 3.827.086 1.11.085 2.007.26 2.66.71.709.489 1.012 1.21 1.15 2.066.13.812.13 1.867.13 3.156v.126c0 1.29 0 2.344-.13 3.156-.138.856-.441 1.577-1.15 2.066-.653.45-1.55.625-2.66.71-1.123.086-2.606.086-4.526.086h-.067c-1.92 0-3.403 0-4.526-.086-1.11-.085-2.007-.26-2.66-.71-.709-.489-1.012-1.21-1.15-2.066C6 19.326 6 18.272 6 16.982v-.126c0-1.29 0-2.344.13-3.156.138-.856.441-1.577 1.15-2.066.653-.45 1.55-.625 2.66-.71.993-.076 2.268-.085 3.879-.086V8.527a2.344 2.344 0 01-1.487-2.184zm-4.807 7.583c-.11.686-.113 1.625-.113 2.993 0 1.368.002 2.307.113 2.993.106.656.29.942.555 1.125.321.22.885.382 1.968.465 1.062.081 2.491.082 4.451.082 1.96 0 3.39-.001 4.452-.082 1.083-.083 1.647-.244 1.968-.465.265-.183.45-.47.555-1.125.11-.686.113-1.625.113-2.993 0-1.368-.002-2.307-.113-2.993-.105-.656-.29-.941-.555-1.124-.321-.222-.885-.383-1.968-.466-1.062-.081-2.491-.082-4.452-.082-1.96 0-3.389.001-4.451.082-1.083.083-1.647.244-1.968.466-.265.183-.45.468-.555 1.124zm4.077-.157c.39 0 .707.317.707.708v.488a.707.707 0 11-1.413 0v-.488c0-.391.316-.708.706-.708zm5.846 0c.39 0 .706.317.706.708v.488a.707.707 0 11-1.413 0v-.488c0-.391.317-.708.707-.708zm-5.896 4.128a.705.705 0 01.998-.027 2.82 2.82 0 003.9 0 .705.705 0 01.998.027.71.71 0 01-.027 1.002 4.23 4.23 0 01-5.843 0 .71.71 0 01-.026-1.002z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
