import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/Like";
import Pagination from "../common/Pagination";

const Movies = () => {
  const [moviesList, setMoviesList] = useState(getMovies());

  const [paginationData, setPaginationData] = useState({
    pageSize: 4,
    currentPage: 1,
  });

  const handleDelete = (id) => {
    const updatedMovies = moviesList.filter((movie) => movie._id !== id);
    setMoviesList(updatedMovies);
  };

  const handleLike = (id) => {
    const updatedMovies = moviesList.filter((movie) => {
      if (movie._id === id) {
        movie.liked = !movie.liked;
      }
      return movie;
    });

    setMoviesList(updatedMovies);
  };

  const handlePageChange = (page) => {
    setPaginationData({ pageSize: paginationData.pageSize, currentPage: page });
  };

  return (
    <div>
      <h5 className="my-5">
        Showing {moviesList.length} movies from the database.
      </h5>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col">Favorite</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {moviesList.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  onClick={() => handleLike(movie._id)}
                  like={movie.liked}
                />
              </td>
              <td>
                <button
                  className="btn btn-md btn-danger"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={moviesList.length}
        pageSize={paginationData.pageSize}
        currentPage={paginationData.currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Movies;
