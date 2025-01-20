import { useComments } from "@/utils/contexts/CommentContext";
import { useUser } from "@/utils/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CommentProp {
  postId: string;
}

const Comments = ({ postId }: CommentProp) => {
  const { comments } = useComments();
  const { getUserNameById } = useUser();
  const postComments = comments.filter((c) => c.postId === postId);

  const [userData, setUserData] = useState<{
    [userId: string]: { name: string; avatar: string | null };
  }>({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userIds = Array.from(
        new Set(postComments.map((comment) => comment.userId))
      );

      for (const userId of userIds) {
        if (!userData[userId]) {
          const user = await getUserNameById(userId);
          if (user) {
            setUserData((prev) => ({
              ...prev,
              [userId]: user,
            }));
          }
        }
      }
    };

    fetchUserData();
  }, [postComments, getUserNameById, userData]);

  return (
    <div className="flex flex-col">
      {postComments.map((comment, index) => {
        const user = userData[comment.userId];
        return (
          <div key={index} className="flex gap-4 justify-between mt-6">
            <Link href={`/profile/${comment.userId}`}>
              <Image
                src={`${user?.avatar || "/login.webp"}`}
                alt="Profile Pic"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            </Link>

            <div className="flex flex-col gap-2 flex-1">
              <Link href={`/profile/${comment.userId}`}>
                <span className="font-medium">{user?.name}</span>
              </Link>
              <p>{comment.description}</p>
              <div className="flex items-center gap-0 text-xs text-gray3 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt="Like-Icon"
                    width={12}
                    height={12}
                    className="cursor-pointer w-4 h-4"
                  />
                  <span className="text-gray2">|</span>
                  <span className="text-gray3">0 Likes</span>
                  Reply
                </div>
              </div>
            </div>
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
