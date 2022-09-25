import React from 'react';
import ChosenFilter from './ChosenFilter';
import NumberFilter from './NumberFilter';
import PlanetFilter from './PlanetFilter';

function Header() {
  return (
    <section>
      <PlanetFilter />
      <NumberFilter />
      <ChosenFilter />
    </section>
  );
}

export default Header;
