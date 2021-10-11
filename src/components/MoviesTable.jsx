import React, { useState } from "react";
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";
import Like from "../common/Like";

const MoviesTable = (props) => {
  const { movies, onDelete, onLike, sortColumn, onSort } = props;

  const [columns, setColumns] = useState([
    { path: "title", label: "Title" },
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
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        items={movies}
        columns={columns}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
};

export default MoviesTable;
