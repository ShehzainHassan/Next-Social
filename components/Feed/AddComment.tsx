import { useComments } from "@/utils/contexts/CommentContext";
import { useUser } from "@/utils/contexts/UserContext";
import Image from "next/image";
import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
interface CommentsProps {
  userId: string;
  postId: string;
  onCommentAdded: () => void;
}
const AddComment = ({ userId, postId, onCommentAdded }: CommentsProps) => {
  const { user } = useUser();
  const [commentText, setCommentText] = useState<string>("");
  const { addNewComment } = useComments();
  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const postComment = () => {
    addNewComment(commentText, userId, postId);
    onCommentAdded();
    setCommentText("");
  };
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <Image
          src={`${user?.avatar || "/login.webp"}`}
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-white1 dark:bg-black1 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            value={commentText}
            onChange={handleComment}
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1 text-gray1 dark:text-gray2 placeholder-gray3 dark:placeholder-gray2"
          />
          <button
            onClick={postComment}
            disabled={!commentText}
            className={`${!commentText ? "opacity-50" : ""}`}>
            <HiPaperAirplane className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddComment;
