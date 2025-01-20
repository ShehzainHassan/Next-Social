"use client";
import { usePosts } from "@/utils/contexts/PostContext";
import { useUser } from "@/utils/contexts/UserContext";
import Image from "next/image";
import { useState } from "react";

const AddPost = () => {
  const [postText, setPostText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useUser();
  const { addNewPost } = usePosts();
  if (!user) return <div>Loading...</div>;

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postText.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      setPostText("");
      await addNewPost(postText);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 shadow-md dark:shadow-lg dark:shadow-gray6 rounded-lg flex gap-4 justify-between text-sm">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAtuSXjT9hTuCmc0uK8VOewjyRz2Fvy_ZlOw&s"
        alt=""
        className="w-12 h-12 object-cover rounded-full"
        width={48}
        height={48}
      />
      <div className="flex-1">
        <form onSubmit={handleNewPost}>
          <div className="flex gap-4">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-1 bg-white1 dark:bg-black1 text-gray1 dark:text-gray2 placeholder-gray3 dark:placeholder-gray2 rounded-lg p-2 outline-none resize-none disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />

            <Image
              src="/emoji.png"
              alt="emoji"
              className="w-5 h-5 cursor-pointer self-end"
              width={20}
              height={20}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-gray2 flex-wrap">
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/addimage.png"
                  alt="add-image"
                  width={20}
                  height={20}
                />
                Photo
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/addVideo.png"
                  alt="add-video"
                  width={20}
                  height={20}
                />
                Video
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/poll.png" alt="add-poll" width={20} height={20} />
                Poll
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/addevent.png"
                  alt="add-event"
                  width={20}
                  height={20}
                />
                Event
              </div>
            </div>
            {postText && (
              <button
                type="submit"
                disabled={isSubmitting || !postText.trim()}
                className="flex items-center justify-center bg-blue2 text-white py-2 px-4 rounded-lg">
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
