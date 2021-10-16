import React from "react";

const MovieDetails = (props) => {
  const handleSave = () => {
    props.history.push("/movies");
  };
  return (
    <div>
      <li></li>
      <h1>Movie Details - {props.match.params.id}</h1>
      <button className="btn btn-md btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MovieDetails;
