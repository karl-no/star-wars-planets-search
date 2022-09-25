import React, { useState, useContext, useEffect } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function NumberFilter() {
  const {
    setNewNumericFilter,
    numericFilterOptions,
  } = useContext(StarWarsPlanetsContext);

  const [filterNumber, setFilterNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const setNumberFilter = () => {
    setNewNumericFilter(filterNumber);
  };

  useEffect(() => setFilterNumber((previousState) => ({
    ...previousState,
    column: numericFilterOptions[0],
  })), [numericFilterOptions]);

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
        { numericFilterOptions.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
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
