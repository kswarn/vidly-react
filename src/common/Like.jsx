import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Like = ({ like }) => {
  return like ? <FavoriteIcon /> : <FavoriteBorderIcon />;
};

export default Like;
