import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsPlanetsContext from './StarWarsPlanetsContext';
import starWarsAPI from '../services/starWarsPlanetsAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    const response = await starWarsAPI();
    const { results } = response;
    const planetsList = results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setPlanets(planetsList);
  };

  const context = {
    planets,
    getPlanets,
  };

  return (
    <StarWarsPlanetsContext.Provider value={ context }>
      { children }
    </StarWarsPlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
