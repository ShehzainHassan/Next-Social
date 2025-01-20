import { usePosts } from "@/utils/contexts/PostContext";
import { useUser } from "@/utils/contexts/UserContext";
import { Posts } from "@/utils/schemaInterfaces";
import Image from "next/image";
import { useState } from "react";
import AddComment from "./AddComment";
import Comments from "./Comments";
import PostInteraction from "./PostInteraction";

const Post = ({ post }: { post: Posts }) => {
  const { user } = useUser();
  const { editPostDescription, updateLikes } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [addComment, setAddComments] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(
    post.comments.length
  );

  const updateCommentCount = () => {
    setCommentCount(commentCount + 1);
  };

  const toggleComments = () => {
    setAddComments(!addComment);
  };
  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 30) {
      return "Just now";
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedDescription(event.target.value);
  };
  const handlePostLikes = () => {
    if (!user) {
      return;
    }
    updateLikes(post._id, user._id);
  };

  const handleUpdateClick = (postId: string, description: string) => {
    setIsEditing(false);
    editPostDescription(postId, description);
  };
  if (!user) {
    return;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={`${user?.avatar || "/login.webp"}`}
            alt="Profile-Pic"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <div className="flex gap-2 items-center">
              <p className="text-xs text-gray2">
                {formatTimeAgo(post.createdAt)}
              </p>
              {post.createdAt !== post.updatedAt && (
                <p className="text-xs text-gray2">
                  (Edited {formatTimeAgo(post.updatedAt)})
                </p>
              )}
            </div>
          </div>
        </div>
        <PostInteraction
          postId={post._id}
          userId={user?._id}
          onEdit={handleEditClick}
        />
      </div>

      <div className="flex flex-col gap-4">
        {isEditing ? (
          <div className="relative">
            <textarea
              value={editedDescription}
              onChange={handleDescriptionChange}
              className="w-full p-2 border-2 border-blue2 rounded-md"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleUpdateClick(post._id, editedDescription)}
                disabled={editedDescription === post.description}
                className="mt-2 bg-blue2 text-white px-4 py-2 rounded-md hover:bg-blue3 focus:outline-none focus:ring-2 focus:ring-blue2 disabled:bg-gray2 dark:bg-blue3 dark:hover:bg-blue4 dark:focus:ring-blue1 disabled:cursor-not-allowed">
                Update
              </button>
              <button
                onClick={cancelEdit}
                className="mt-2 bg-gray3 text-white px-4 py-2 rounded-md hover:bg-gray7 focus:outline-none focus:ring-2 focus:ring-gray3 disabled:bg-gray2 dark:bg-gray7 dark:hover:bg-gray5 dark:focus:ring-gray2 disabled:cursor-not-allowed">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>{post.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-white2 dark:bg-black1 p-2 rounded-xl shadow-md dark:shadow-lg">
            {post?.likes?.length > 0 &&
            post?.likes.some((like) => like.userId === user?._id) ? (
              <Image
                onClick={handlePostLikes}
                src="/liked.png"
                alt="Like-Icon"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            ) : (
              <Image
                onClick={handlePostLikes}
                src="/like.png"
                alt="Like-Icon"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            )}

            <span className="text-gray2">|</span>

            <span className="text-gray3 dark:text-gray2">
              {post?.likes?.length || 0}
              <span className="hidden md:inline"> Likes</span>
            </span>
          </div>
          <div
            onClick={toggleComments}
            className="flex items-center gap-4 bg-white2 dark:bg-black1 p-2 rounded-xl shadow-md dark:shadow-lg">
            <Image
              src="/comment.png"
              alt="Comment-Icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray2">|</span>
            <span className="text-gray3 dark:text-gray2">
              {commentCount}
              <span className="hidden md:inline"> Comment</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-white2 dark:bg-black1 p-2 rounded-xl shadow-md dark:shadow-lg">
            <Image
              src="/share.png"
              alt="Share-Icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray2">|</span>
            <span className="text-gray3 dark:text-gray2">
              0 <span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      {addComment && (
        <div>
          <AddComment
            userId={user._id}
            postId={post._id}
            onCommentAdded={updateCommentCount}
          />
          <Comments postId={post._id} />
        </div>
      )}
    </div>
  );
};

export default Post;
