import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "../common/Like";
import ListGroup from "../common/ListGroup";
import Pagination from "../common/Pagination";
import { paginate } from "../utils/paginate";
import { Row, Col } from "react-bootstrap";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);

  const [genres, setGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState({});

  const [paginationData, setPaginationData] = useState({
    pageSize: 4,
    currentPage: 1,
  });

  useEffect(() => {
    const genres = [{ name: "All movies" }, ...getGenres()];
    setMoviesList(getMovies());
    setGenres(genres);
  }, []);

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

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const filtered =
    selectedGenre && selectedGenre._id
      ? moviesList.filter((movie) => movie.genre._id === selectedGenre._id)
      : moviesList;

  const movies = paginate(
    filtered,
    paginationData.currentPage,
    paginationData.pageSize
  );

  return (
    <Row>
      <Col xs={3}>
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
          // use these props when the default values are different
          // textProperty="name"
          // valueProperty="_id"
        />
      </Col>
      <Col>
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
              {movies.map((movie) => (
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
            itemsCount={filtered.length}
            pageSize={paginationData.pageSize}
            currentPage={paginationData.currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Movies;
