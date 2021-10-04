import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/Like";

const Movies = () => {
  const movies = getMovies();
  const [moviesList, setMoviesList] = useState(movies);

  const handleDelete = (id) => {
    const updatedMovies = moviesList.filter((movie) => movie._id !== id);
    setMoviesList(updatedMovies);
  };

  const handleLike = (id) => {
    console.log(id);
    const updatedMovies = moviesList.filter((movie) => {
      if (movie._id === id) {
        movie.liked = !movie.liked;
      }
      return movie;
    });

    setMoviesList(updatedMovies);
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
                <button
                  style={{
                    border: "none",
                    outline: "none",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLike(movie._id)}
                >
                  <Like like={movie.liked} />
                </button>
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
    </div>
  );
};

export default Movies;