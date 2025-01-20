"use client";

const UserInfoCardInteraction = () => {
  return (
    <>
      <button className="w-full bg-blue2 text-white text-sm rounded-md p-2">
        Follow
      </button>
      <span className="text-red2 text-xs self-end cursor-pointer hover:underline">
        Block User
      </span>
    </>
  );
};
export default UserInfoCardInteraction;
