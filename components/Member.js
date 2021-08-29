import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: "35px",
    width: "35px",
  },
}));

function Member({ src }) {
  const classes = useStyles();
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
      <Avatar src={src} className={classes.avatar} />
      <div className="absolute bottom-2 left-[22px] bg-green-300 h-3 w-3 rounded-full border-2 border-gray-100"></div>
    </div>
  );
}

export default Member;
