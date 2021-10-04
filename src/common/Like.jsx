import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Like = ({ like, onClick }) => {
  return like ? (
    <FavoriteIcon style={{ cursor: "pointer" }} onClick={onClick} />
  ) : (
    <FavoriteBorderIcon style={{ cursor: "pointer" }} onClick={onClick} />
  );
};

export default Like;
