import React, { useState, useContext } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function NumberFilter() {
  const { setNewNumericFilter } = useContext(StarWarsPlanetsContext);

  const [filterNumber, setFilterNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [change] = useState([]);
  const [columnsNames] = useState([
    'population',
    'diameter',
    'orbital_period',
    'rotation_period',
    'surface_water',
  ]);

  const setNumberFilter = () => {
    setNewNumericFilter(filterNumber);
  };

  const handleFilter = (target) => {
    setFilterNumber({
      ...filterNumber,
      [target.name]: target.value,
    });
  };

  return (
    <section>

      <select
        data-testid="column-filter"
        name="column"
        id="column-filter"
        value={ filterNumber.column }
        onChange={ (event) => handleFilter(event.target) }
      >
        {/* <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */}
        { columnsNames.map((column) => {
          if (!change.some((filter) => filter.column === column)) {
            return <option key={ column } value={ column }>{column}</option>;
          }
          return '';
        })}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        id="comparison-filter"
        value={ filterNumber.comparison }
        onChange={ (event) => handleFilter(event.target) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="value"
        data-testid="value-filter"
        value={ filterNumber.value }
        onChange={ (event) => handleFilter(event.target) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ setNumberFilter }
      >
        Filtrar
      </button>

    </section>
  );
}

export default NumberFilter;
