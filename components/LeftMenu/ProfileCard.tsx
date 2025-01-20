"use client";
import { useUser } from "@/utils/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
const ProfileCard = () => {
  const { user } = useUser();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray6">
      <div className="h-20 relative">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-4 ring-1 ring-white z-11"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 mt-4 items-center">
        <span className="font-semibold">
          {user.firstName} {user.lastName}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className="text-xs ">
            <span className="font-bold">{user?.followers.length}</span>{" "}
            followers
          </span>
        </div>
        <Link href={`/profile/${user._id}`}>
          <button className="bg-blue2  text-white text-xs p-2 rounded-md hover:bg-blue3 dark:bg-blue4 dark:hover:bg-blue3">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ProfileCard;
