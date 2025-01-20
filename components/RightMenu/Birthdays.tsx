import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="p-4 rounded-lg shadow-md dark:shadow-lg dark:shadow-gray6 text-sm flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray3">Birthdays</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
            alt="profile-pic"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Wayne Burton</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-blue2 text-white text-xs px-2 py-1 rounded-md">
            Celebrate
          </button>
        </div>
      </div>
      <div className="p-4 bg-white1 dark:bg-black1 rounded-lg flex items-center gap-4 mt-4">
        <Image src="/gift.png" alt="gift" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray5 dark:text-gray2 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray3 dark:text-gray2">
            See other 16 have upcoming birthdays
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
