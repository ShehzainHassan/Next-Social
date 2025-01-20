import { usePosts } from "@/utils/contexts/PostContext";
import { useUser } from "@/utils/contexts/UserContext";
import { Posts } from "@/utils/schemaInterfaces";
import { usePathname } from "next/navigation";
import Post from "./Post";

const Feed = () => {
  const { user } = useUser();
  const { posts } = usePosts();
  const url = usePathname();

  if (!user || !posts) return <div>Loading...</div>;

  const sortedPosts = [...posts].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );

  if (url.includes("/profile")) return null;

  return posts.length > 0 ? (
    <div
      className={`shadow-md dark:shadow-lg dark:shadow-gray6 rounded-lg flex flex-col gap-12 ${
        posts.length > 0 ? "p-4" : "p-0"
      }`}>
      {sortedPosts.map((p: Posts) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  ) : null;
};

export default Feed;
