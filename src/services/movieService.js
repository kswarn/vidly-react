import crud from "./httpService";
import config from "../../src/config.json";

export const getMovies = async () => {
  const { data: movies } = await crud.get(config.apiEndpoint + "/movies");

  return movies;
};

export const deleteMovie = async (id) => {
  const { data: deletedMovie } = await crud.delete(
    config.apiEndpoint + "/movies/" + id
  );
  return deletedMovie;
};
