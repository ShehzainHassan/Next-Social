import Image from "next/image";

const Comments = () => {
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="">
        <div className="flex gap-4 justify-between mt-6">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR132TBAD0-GhGhN8_2Xr-3obkFd4NzFbk6Hg&s"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Bernice Spencer</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              rerum qui deleniti inventore ad itaque minima nihil tenetur culpa
              magni temporibus quibusdam dicta, reprehenderit natus eum ex earum
              quo maiores!
            </p>
            <div className="flex items-center gap-0 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt="Like-Icon"
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
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
      </div>
    </div>
  );
};
export default Comments;
