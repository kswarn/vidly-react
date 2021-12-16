import React, { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "../common/ListGroup";
import Pagination from "../common/Pagination";
import { paginate } from "../utils/paginate";
import { Row, Col } from "react-bootstrap";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";

import _ from "lodash";

const Movies = () => {
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

  const [searchString, setSearchString] = useState("");

  const fakemovies = [
    {
      _id: "5b21ca3eeb7f6fbccd471815",
      title: "Terminator",
      genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      numberInStock: 6,
      dailyRentalRate: 2.5,
      publishDate: "2018-01-03T19:04:28.809Z",
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd471816",
      title: "Die Hard",
      genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      numberInStock: 5,
      dailyRentalRate: 2.5,
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd471817",
      title: "Get Out",
      genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
      numberInStock: 8,
      dailyRentalRate: 3.5,
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd471819",
      title: "Trip to Italy",
      genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      numberInStock: 7,
      dailyRentalRate: 3.5,
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181a",
      title: "Airplane",
      genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      numberInStock: 7,
      dailyRentalRate: 3.5,
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181b",
      title: "Wedding Crashers",
      genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      numberInStock: 7,
      dailyRentalRate: 3.5,
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181e",
      title: "Gone Girl",
      genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
      numberInStock: 7,
      dailyRentalRate: 4.5,
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181f",
      title: "The Sixth Sense",
      genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
      numberInStock: 4,
      dailyRentalRate: 3.5,
      liked: false,
    },
    {
      _id: "5b21ca3eeb7f6fbccd471821",
      title: "The Avengers",
      genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      numberInStock: 7,
      dailyRentalRate: 3.5,
      liked: false,
    },
  ];

  useEffect(() => {
    getGenres()
      .then((res) => {
        const genres = [{ _id: "", name: "All movies" }, ...res];
        setGenres(genres);
      })
      .catch((err) => console.log(err));

    // setMoviesList(fakemovies);

    getMovies()
      .then((res) => {
        setMoviesList(res);
      })
      .catch((err) => console.log(err));
    console.log(moviesList, "use effect");
  }, []);

  const handleDelete = (id) => {
    console.log(moviesList);
    const updatedMovies = moviesList.filter((movie) => movie._id !== id);
    // setMoviesList(updatedMovies);
    console.log(updatedMovies, "updated");
    deleteMovie(id)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setMoviesList(moviesList);
      });
  };

  const handleLike = (id) => {
    console.log(moviesList, "like");
    const updatedMovies = moviesList.filter((movie) => {
      if (movie._id === id) {
        movie.liked = !movie.liked;
      }
      return movie;
    });

    setMoviesList(updatedMovies);
  };

  const handlePageChange = (page) => {
    console.log(moviesList, "");
    setPaginationData({ pageSize: paginationData.pageSize, currentPage: page });
  };

  const handleGenreSelect = (genre) => {
    console.log(moviesList, "gs");
    setSelectedGenre(genre);
    setSearchString("");
    setPaginationData({ pageSize: 4, currentPage: 1 });
  };

  const handleSort = (sortColumnClone) => {
    setSortColumn(sortColumnClone);
  };

  const handleSearch = (e) => {
    setSearchString(e.target.value);

    setSelectedGenre(null);

    setPaginationData({ currentPage: 1 });
  };

  const filtered =
    selectedGenre && selectedGenre._id
      ? moviesList.filter((movie) => movie.genre._id === selectedGenre._id)
      : moviesList;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const movieData =
    searchString !== ""
      ? sorted.filter((movie) =>
          movie.title.toLowerCase().startsWith(searchString.toLowerCase())
        )
      : sorted;
  const movies = paginate(
    movieData,
    paginationData.currentPage,
    paginationData.pageSize
  );

  console.log(moviesList, "before return");

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
          <Link className="btn btn-primary my-2" to="/movies/new">
            New Movie
          </Link>
          <h5 className="my-2">
            Showing {filtered.length} movies from the database.
          </h5>
          <input
            className="form-control my-3"
            placeholder="Search"
            type="text"
            onChange={(e) => handleSearch(e)}
            value={searchString}
            id="searchString"
          ></input>
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
