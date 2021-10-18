import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import Like from "../common/Like";

const MoviesTable = ({ movies, onDelete, onLike, sortColumn, onSort }) => {
  const [columns, setColumns] = useState([
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "",
      label: "Favorite",
      content: (movie) => (
        <Like onClick={() => onLike(movie._id)} like={movie.liked} />
      ),
    },
    {
      path: "",
      label: "",
      content: (movie) => (
        <button
          className="btn btn-md btn-danger"
          onClick={() => onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ]);

  return (
    <Table
      columns={columns}
      items={movies}
      onSort={onSort}
      sortColumn={sortColumn}
      onLike={onLike}
      onDelete={onDelete}
    />
  );
};

export default MoviesTable;
