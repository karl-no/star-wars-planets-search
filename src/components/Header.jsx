import React, { useContext } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function Header() {
  const {
    filters: {
      filterByName: { name },
    }, handleFilterName } = useContext(StarWarsPlanetsContext);
  return (
    <section>
      <label htmlFor="inputName">
        <input
          type="text"
          name="inputName"
          id="inputName"
          data-testid="name-filter"
          value={ name }
          onChange={ (event) => handleFilterName(event.target.value) }
        />
      </label>
    </section>
  );
}

export default Header;
