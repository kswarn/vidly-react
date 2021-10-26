import React from "react";
import Form from "../common/Form";
import Input from "../common/input";
import Joi from "joi-browser";

import { getMovies, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    errors: {},
    movies: getMovies(),
    genres: getGenres(),
  };

  componentDidMount() {
    const currentMovieId = this.props.match?.params?.id;
    if (currentMovieId === "new") return;
    const movies = [...this.state.movies];
    const currentMovie = movies.filter((mov) => mov._id === currentMovieId);
    console.log(currentMovie[0]);
    if (currentMovie[0]) {
      this.setState({
        data: {
          title: currentMovie[0].title,
          genre: currentMovie[0].genre.name,
          numberInStock: currentMovie[0].numberInStock,
          dailyRentalRate: currentMovie[0].dailyRentalRate,
        },
      });
    } else {
      this.props.history.push("/not-found");
    }
  }

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
  };

  doSubmit = (e) => {
    const newMovieData = {
      title: e.target.title.value,
      genre: e.target.genre.value,
      numberInStock: e.target.numberInStock.value,
      dailyRentalRate: e.target.dailyRentalRate.value,
    };
    // console.log(e.target.genre);
    saveMovie(newMovieData);
    console.log("submitted");
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
              id="genre"
              onChange={this.handleInputChange}
            >
              {this.state.genres.map((genre) => (
                <option key={genre._id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
            {this.state.errors.genre && (
              <div className="alert alert-danger">
                {this.state.errors.genre}
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
