const API_STAR_WARS_PLANETS = 'https://swapi.dev/api/planets';

const starWarsAPI = async () => {
  const response = await fetch(API_STAR_WARS_PLANETS);
  const data = await response.json();
  return data;
};

export default starWarsAPI;
