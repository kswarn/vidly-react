import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../common/ListGroup";
import Pagination from "../common/Pagination";
import { paginate } from "../utils/paginate";
import { Row, Col } from "react-bootstrap";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";

import _ from "lodash";

const Movies = (props) => {
  const [moviesList, setMoviesList] = useState([]);

  const [genres, setGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState({});

  const [paginationData, setPaginationData] = useState({
    pageSize: 4,
    currentPage: 1,
  });

  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });

  useEffect(() => {
    const genres = [{ _id: "", name: "All movies" }, ...getGenres()];
    setMoviesList(getMovies());
    setGenres(genres);
  }, []);

  const handleAddNewMovie = () => {
    props.history.push("/movies/new/");
  };

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
    setPaginationData({ pageSize: 4, currentPage: 1 });
  };

  const handleSort = (sortColumnClone) => {
    setSortColumn(sortColumnClone);
  };

  const filtered =
    selectedGenre && selectedGenre._id
      ? moviesList.filter((movie) => movie.genre._id === selectedGenre._id)
      : moviesList;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const movies = paginate(
    sorted,
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
          <h5 className="my-2">
            Showing {filtered.length} movies from the database.
          </h5>
          <Link className="btn btn-primary my-2" to="/movies/new">
            New Movie
          </Link>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
          />
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
