import { Avatar } from "@material-ui/core";

function Member({ src }) {
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
      <Avatar
        className="rounded-full object-cover"
        src={src}
        width={30}
        height={30}
        loading="lazy"
      />
      {/* <p>{name}</p> */}
      {/* <div className="absolute bottom-2 left-7 bg-green-400 h-2 w-2 rounded-full animate-ping"></div> */}
      <div className="absolute bottom-2 left-7 bg-green-300 h-3 w-3 rounded-full border-2 border-gray-100"></div>
    </div>
  );
}

export default Member;
