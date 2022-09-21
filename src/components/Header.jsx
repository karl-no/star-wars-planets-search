import React from 'react';
import NumberFilter from './NumberFilter';
import PlanetFilter from './PlanetFilter';

function Header() {
  return (
    <section>
      <PlanetFilter />
      <NumberFilter />
    </section>
  );
}

export default Header;
