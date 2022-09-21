import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsPlanetsContext from './StarWarsPlanetsContext';
import starWarsAPI from '../services/starWarsPlanetsAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsOriginal, setPlanetsOriginal] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

  const getPlanets = async () => {
    const response = await starWarsAPI();
    const { results } = response;
    const planetsList = results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setPlanets(planetsList);
    setPlanetsOriginal(planetsList);
  };

  const handleFilterName = (name) => {
    setFilters((previousFilter) => ({
      ...previousFilter,
      filterByName: { name },
    }));
    if (name.length > 0) {
      const searchInLowerCase = name.toLowerCase();
      const planetsLowerCase = planets.filter((planet) => planet.name.toLowerCase()
        .includes(searchInLowerCase));
      setPlanets(planetsLowerCase);
    } else {
      setPlanets(planetsOriginal);
    }
  };

  const handleInputFilterNumericValue = (filter) => {
    let filteredPlanets = [];
    if (filter.comparison === 'maior que') {
      filteredPlanets = planets.filter(
        (planet) => Number(planet[filter.column]) > +filter.value,
      );
    } else if (filter.comparison === 'menor que') {
      filteredPlanets = planets.filter(
        (planet) => Number(planet[filter.column]) < +filter.value,
      );
    } else if (filter.comparison === 'igual a') {
      filteredPlanets = planets.filter(
        (planet) => Number(planet[filter.column]) === +filter.value,
      );
    }
    setPlanets(filteredPlanets);
  };

  const setNewNumericFilter = (filterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, filterValue],
    }));
    handleInputFilterNumericValue(filterValue);
  };

  const context = {
    planets,
    getPlanets,
    filters,
    handleFilterName,
    setNewNumericFilter,
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
