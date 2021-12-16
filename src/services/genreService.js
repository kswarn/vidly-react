import crud from "./httpService";
import config from "../../src/config.json";

export const getGenres = async () => {
  const { data: genres } = await crud.get(config.apiEndpoint + "/genres");

  return genres;
};
