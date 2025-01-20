import { useUser } from "@/utils/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import EditProfileModal from "../EditProfileModal";
import UserInfoCardInteraction from "./UserInfoCardInteraction";

type UserInfoCardProp = {
  userId?: string;
};

const getOrdinalSuffix = (day: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = day % 100;
  return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
};

const UserInfoCard = ({ userId }: UserInfoCardProp) => {
  const { user, profileUser, loadUserByID } = useUser();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (typeof userId === "string") {
      loadUserByID(userId);
    }
  }, []);
  const createdAtDate = new Date(profileUser?.createdAt || Date.now());

  const dayWithSuffix = getOrdinalSuffix(createdAtDate.getDate());

  const formattedDate = `${dayWithSuffix} ${createdAtDate.toLocaleString(
    "en-US",
    {
      month: "long",
    }
  )}, ${createdAtDate.getFullYear()}`;

  if (!profileUser) {
    return null;
  }
  return (
    <div className="p-4 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray6 text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray3">User Information</span>
        <Link href="/" className="text-blue2 text-xs hover:underline">
          See all
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-gray3 dark:text-gray2">
        <div className="flex items-center gap-2">
          <span className="text-xl text-gray1 dark:text-gray10">
            {profileUser.firstName} {profileUser?.lastName}
          </span>
          <span className="text-sm text-gray3 dark:text-gray2">
            @{profileUser.firstName.toLowerCase()}
          </span>
        </div>

        {profileUser.description && (
          <p className="text-gray5 dark:text-gray4">
            {profileUser.description}
          </p>
        )}

        {profileUser.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="map" width={16} height={16} />
            <span className="text-gray5 dark:text-gray4">
              Living in <b>{profileUser.city}</b>
            </span>
          </div>
        )}

        {profileUser.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="school" width={16} height={16} />
            <span className="text-gray5 dark:text-gray4">
              Went to <b>{profileUser.school}</b>
            </span>
          </div>
        )}

        {profileUser.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="work" width={16} height={16} />
            <span className="text-gray5 dark:text-gray4">
              Works at <b>{profileUser.work}</b>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {profileUser.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="link" width={16} height={16} />
              <Link
                href={profileUser.website}
                className="text-blue2 dark:text-blue1 font-medium">
                {profileUser.website}
              </Link>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="date" width={16} height={16} />
            <span className="text-gray5 dark:text-gray4">
              Joined {formattedDate}
            </span>
          </div>
        </div>

        {user?._id === profileUser._id ? (
          <div
            onClick={() => setShowModal(true)}
            className="bg-gray4 text-gray3 cursor-pointer p-2 text-xs rounded-lg hover:bg-gray2 dark:bg-gray5 dark:text-gray2 dark:hover:bg-gray7 flex justify-center items-center gap-2">
            <span>
              <MdEdit />
            </span>
            <button>Edit Profile</button>
          </div>
        ) : (
          <UserInfoCardInteraction />
        )}
        <EditProfileModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default UserInfoCard;
