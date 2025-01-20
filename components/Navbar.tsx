"use client";
import { searchResults } from "@/actions/auth-actions";
import ThemeSwitch from "@/app/ThemeSwitcher";
import { useToken } from "@/utils/contexts/TokenContext";
import { useUser } from "@/utils/contexts/UserContext";
import { UserInfo } from "@/utils/schemaInterfaces";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { user } = useUser();
  const { token, getToken, clearToken } = useToken();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
    };

    fetchToken();
  }, [getToken]);

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await searchResults(searchQuery);
        setResults(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search Results: ", error);
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(fetchResults, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleLogout = () => {
    clearToken();
    setShowLogout(false);
    router.push("/signIn");
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (!token) return null;

  return (
    <div className="h-24 flex items-center justify-between">
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-primary">
          NEXT-SOCIAL
        </Link>
      </div>

      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              alt="Stories"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2 relative">
          <div className="hidden xl:flex p-2 bg-white1 dark:bg-black1 items-center rounded-xl">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchQuery}
              className="bg-transparent outline-none text-gray1 dark:text-gray2 placeholder-gray3 dark:placeholder-gray2 w-full"
            />
          </div>

          {searchQuery && results.length > 0 && (
            <div className="hidden xl:flex p-2 bg-white1 dark:bg-black1 items-center rounded-xl absolute top-full left-0 right-0 z-10 mt-2">
              {loading && <p>Searching...</p>}
              <ul className="w-full space-y-2">
                {results?.map((user) => (
                  <Link href={`/profile/${user._id}`} key={user._id}>
                    <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray4 dark:hover:bg-gray5 rounded-md transition-all duration-200 ease-in-out">
                      <li>
                        <Image
                          src={`${user?.avatar || "/login.webp"}`}
                          alt="profile avatar"
                          width={30}
                          height={30}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      </li>
                      <li>{user.firstName}</li>
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
          )}
          {searchQuery && results.length === 0 && (
            <div className="hidden xl:flex items-center justify-center p-2 bg-white1 dark:bg-black1 rounded-xl absolute top-full left-0 right-0 z-10 mt-2">
              No results found
            </div>
          )}
        </div>
      </div>

      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <div>
          <ThemeSwitch />
        </div>
        <div className="cursor-pointer">
          <GoPeople />
        </div>
        <div className="cursor-pointer">
          <LuMessageCircleMore />
        </div>
        <div className="cursor-pointer">
          <FaRegBell />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Image src="/login.webp" alt="Login" width={20} height={20} />
          {token ? (
            <div className="relative">
              <p onClick={toggleLogout} className="cursor-pointer">
                {user?.firstName}
              </p>
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className={`absolute left-0 mt-2 p-2 bg-blue1 text-white rounded-md transition-all duration-300 ease-in-out transform ${
                    showLogout
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                  Logout
                </button>
              )}
            </div>
          ) : (
            <Link href="/signIn">Login/Register</Link>
          )}
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
