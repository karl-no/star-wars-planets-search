import React, { useContext } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function ChosenFilter() {
  const { filters, setFilters } = useContext(StarWarsPlanetsContext);
  const resetFilters = () => {
    setFilters((previousState) => ({
      ...previousState,
      filterByNumericValues: [],
    }));
  };

  const deleteFilter = (filterToRemove) => {
    setFilters((previousState) => ({
      ...previousState,
      filterByNumericValues: previousState.filterByNumericValues
        .filter((filter) => filter !== filterToRemove),
    }));
  };

  return (
    <div>
      { filters.filterByNumericValues.map((filter) => (
        <div
          key={ filter.column }
          data-testid="filter"
        >
          <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
          <button
            type="button"
            onClick={ () => deleteFilter(filter) }
          >
            Apagar filtro
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ resetFilters }
      >
        Resetar filtros
      </button>
    </div>
  );
}

export default ChosenFilter;
