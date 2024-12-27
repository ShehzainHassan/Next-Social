import Image from "next/image";

const AddPost = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAtuSXjT9hTuCmc0uK8VOewjyRz2Fvy_ZlOw&s"
        alt=""
        className="w-12 h-12 object-cover rounded-full"
        width={48}
        height={48}
      />
      <div className="flex-1">
        <div className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"></textarea>
          <Image
            src="/emoji.png"
            alt="emoji"
            className="w-5 h-5 cursor-pointer self-end"
            width={20}
            height={20}
          />
        </div>
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addimage.png" alt="add-image" width={20} height={20} />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="add-video" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="add-poll" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="add-event" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddPost;
