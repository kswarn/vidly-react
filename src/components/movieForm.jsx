import React from "react";
import Form from "../common/Form";
import Input from "../common/input";
import Joi from "joi-browser";

import { saveMovie, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const currentMovieId = this.props.match?.params?.id;
    if (currentMovieId === "new") return;

    const movie = getMovie(currentMovieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="title"
            value={data.title}
            label="Title"
            onChange={this.handleInputChange}
            error={errors.title}
          />
          <div className="form-group">
            <label>Genre</label>
            <select
              className="form-control"
              id="genreId"
              onChange={this.handleInputChange}
            >
              {this.state.genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {this.state.errors.genreId && (
              <div className="alert alert-danger">
                {this.state.errors.genreId}
              </div>
            )}
          </div>

          <Input
            type="number"
            name="numberInStock"
            value={data.numberInStock}
            label="Number In Stock"
            onChange={this.handleInputChange}
            error={errors.numberInStock}
          />
          <Input
            type="number"
            name="dailyRentalRate"
            value={data.dailyRentalRate}
            label="Rate"
            onChange={this.handleInputChange}
            error={errors.dailyRentalRate}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
