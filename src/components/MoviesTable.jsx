import React from "react";
import Like from "../common/Like";

const MoviesTable = (props) => {
  const { movies, onDelete, onLike, onSort, sortColumn } = props;
  const raiseSort = (path) => {
    const sortColumnClone = { ...sortColumn };
    if (path === sortColumnClone.path) {
      sortColumnClone.order = sortColumnClone.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }

    onSort(sortColumnClone);
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => raiseSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => raiseSort("genre.name")} scope="col">
            Genre
          </th>
          <th onClick={() => raiseSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => raiseSort("dailyRentalRate")} scope="col">
            Rate
          </th>
          <th scope="col">Favorite</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onClick={() => onLike(movie._id)} like={movie.liked} />
            </td>
            <td>
              <button
                className="btn btn-md btn-danger"
                onClick={() => onDelete(movie._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
