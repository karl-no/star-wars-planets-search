import React, { useContext, useEffect } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';
import Header from './Header';

function Table() {
  const { planets, getPlanets } = useContext(StarWarsPlanetsContext);

  const headers = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <main>
      <h1>STAR WARS</h1>
      <Header />
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={ index }>
                { header }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { planets.map((planet, index) => (
            <tr key={ index }>
              <td>
                {planet.name}
              </td>
              <td>
                {planet.rotation_period}
              </td>
              <td>
                {planet.orbital_period}
              </td>
              <td>
                {planet.diameter}
              </td>
              <td>
                {planet.climate}
              </td>
              <td>
                {planet.gravity}
              </td>
              <td>
                {planet.terrain}
              </td>
              <td>
                {planet.surface_water}
              </td>
              <td>
                {planet.population}
              </td>
              <td>
                {planet.films}
              </td>
              <td>
                {planet.created}
              </td>
              <td>
                {planet.edited}
              </td>
              <td>
                {planet.url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </main>
  );
}
export default Table;
