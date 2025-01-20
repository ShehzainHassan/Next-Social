"use client";
import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import RightMenu from "@/components/RightMenu/RightMenu";
import { useUser } from "@/utils/contexts/UserContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
  const { profileUser, loadUserByID } = useUser();
  const { id } = useParams();
  const loadUserDetails = async () => {
    if (typeof id === "string") {
      await loadUserByID(id);
    }
  };
  useEffect(() => {
    if (id) {
      loadUserDetails();
    }
  }, [id]);
  if (!profileUser) {
    return <div>Loading...</div>;
  }
  if (!id) {
    return null;
  }
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
                alt="profile cover"
                fill
                className="rounded-md object-cover"
              />
              {profileUser.avatar ? (
                <Image
                  src={`${profileUser.avatar}`}
                  alt="profile avatar"
                  width={120}
                  height={120}
                  className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
                />
              ) : (
                <Image
                  src="/login.webp"
                  alt="profile avatar"
                  width={120}
                  height={120}
                  className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 object-cover"
                />
              )}
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {profileUser.firstName} {profileUser.lastName}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{profileUser.posts.length}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">
                  {profileUser.followers.length}
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">
                  {profileUser.followings.length}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId={profileUser._id} />
      </div>
    </div>
  );
};

export default ProfilePage;
