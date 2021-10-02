import React from "react";

const Like = ({ like }) => {
  const name = like ? "f" : "nf";
  return <h6>{name}</h6>;
};

export default Like;
