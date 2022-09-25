import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsPlanetsContext from './StarWarsPlanetsContext';
import starWarsAPI from '../services/starWarsPlanetsAPI';

const EVERY_OPTION = [
  'population',
  'diameter',
  'orbital_period',
  'rotation_period',
  'surface_water',

];

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsOriginal, setPlanetsOriginal] = useState([]);
  const [numericFilter, setNumericFilter] = useState(EVERY_OPTION);
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

  const handleFilterPlanetName = (name) => {
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

  const checkNumbersOptions = () => {
    const selectedOptions = filters.filterByNumericValues.map(({ column }) => column);
    const optionsLeftOvers = EVERY_OPTION.filter(
      (option) => !selectedOptions.includes(option),
    );
    setNumericFilter(optionsLeftOvers);
    if (selectedOptions.length === 0) setNumericFilter(EVERY_OPTION);
  };

  const filterByNumber = () => {
    let updateListOfPlanets = false;
    filters.filterByNumericValues.forEach((filter) => {
      const arrayOfPlanets = updateListOfPlanets ? planets : planetsOriginal;
      let planetsFiltered = [];
      if (filter.comparison === 'maior que') {
        planetsFiltered = arrayOfPlanets.filter(
          (planet) => Number(planet[filter.column]) > +filter.value,
        );
      } else if (filter.comparison === 'menor que') {
        planetsFiltered = arrayOfPlanets.filter(
          (planet) => Number(planet[filter.column]) < +filter.value,
        );
      } else if (filter.comparison === 'igual a') {
        planetsFiltered = arrayOfPlanets.filter(
          (planet) => Number(planet[filter.column]) === +filter.value,
        );
      }
      setPlanets(planetsFiltered);
      updateListOfPlanets = true;
      checkNumbersOptions();
    });
  };

  const handleFilterNumbers = () => {
    if (filters.filterByNumericValues.length === 0) {
      setPlanets(planetsOriginal);
      checkNumbersOptions();
    }
    if (filters.filterByNumericValues.length > 0) filterByNumber();
    checkNumbersOptions();
  };

  const setNumbersFilter = (filterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, filterValue],
    }));
  };

  useEffect(() => handleFilterNumbers(), [filters.filterByNumericValues]);

  const context = {
    planets,
    getPlanets,
    filters,
    handleFilterName: handleFilterPlanetName,
    setNewNumericFilter: setNumbersFilter,
    setFilters,
    numericFilterOptions: numericFilter,
    checkNumericOptions: checkNumbersOptions,
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
