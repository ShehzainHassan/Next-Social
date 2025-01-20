"use client";
import { usePosts } from "@/utils/contexts/PostContext";
import Image from "next/image";
import { useState } from "react";

interface PostInteractionProps {
  postId: string;
  userId: string;
  onEdit: () => void;
}

const PostInteraction = ({ postId, userId, onEdit }: PostInteractionProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const { removePost } = usePosts();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDelete = () => {
    setShowMenu(false);
    removePost(postId, userId);
  };

  const handleEdit = () => {
    onEdit();
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <Image
        className="cursor-pointer"
        src="/more.png"
        alt="Three dots"
        width={16}
        height={16}
        onClick={toggleMenu}
      />
      <div
        className={`absolute cursor-pointer right-0 mt-2 p-2 bg-gray2 border rounded-lg shadow-lg transition-all duration-300 transform  max-w-[140px] ${
          showMenu
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-2"
        } dark:bg-gray8 dark:border-gray7`}>
        <button
          className="w-24 py-1 px-2 mb-2 hover:bg-gray8 hover:text-white  dark:hover:bg-gray7 rounded-lg"
          onClick={handleEdit}>
          Edit Post
        </button>
        <button
          className="w-24 py-1 px-2 hover:bg-red2 hover:text-white dark:hover:bg-red2 rounded-lg"
          onClick={handleDelete}>
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default PostInteraction;
