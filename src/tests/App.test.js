import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import App from '../App';

describe('Testa o componente Table', () => {

  test('Se renderiza o componente Table', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());
  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
  });
  
  test('Se Table possui os elementos inputs e botões', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => testData,
    }));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const inputPlanetName = screen.getByPlaceholderText(/filtrar por nome/i);
  const selectColumnFilter = screen.getByTestId('column-filter');
  const selectComparisonFilter = screen.getByTestId('comparison-filter');
  const selectValueFilter = screen.getByTestId('value-filter');
  const buttonFiltrar = screen.getByTestId('button-filter');
  const buttonResetarFiltros = screen.getByTestId('button-remove-filters');
  const rowsInTheTable = screen.getAllByRole('row');

  expect(inputPlanetName).toBeInTheDocument();
  expect(selectColumnFilter).toBeInTheDocument();
  expect(selectComparisonFilter).toBeInTheDocument();
  expect(selectValueFilter).toBeInTheDocument();
  expect(buttonFiltrar).toBeInTheDocument();
  expect(buttonResetarFiltros).toBeInTheDocument();
  expect(rowsInTheTable).toHaveLength(11);
});

test('Se é possível encontrar um planeta pelo nome', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => testData,
  }));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const inputPlanetName = screen.getByPlaceholderText(/filtrar por nome/i);
  const rowsInTheTable = screen.getAllByRole('row');
  expect(rowsInTheTable.length).toBe(11);

  userEvent.type(inputPlanetName, 'tat');
  expect(inputPlanetName.value).toBe('tat');

  const rowFiltered = screen.getAllByRole('row');
  expect(rowFiltered.length).toBe(2);
});

test('Se é possível filtrar a partir de um número no input "value-filter"', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => testData,
  }));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const columnSelect = await screen.getByTestId('column-filter');
  const comparisonSelect = await screen.getByTestId('comparison-filter');
  const valueSelect = await screen.getByTestId('value-filter');
  const buttonFilter = await screen.getByTestId('button-filter');

  userEvent.selectOptions(columnSelect, 'population');
  userEvent.selectOptions(comparisonSelect, 'maior que');
  userEvent.clear(valueSelect);
  userEvent.type(valueSelect, '200000');
  userEvent.click(buttonFilter);

  const rowFiltered = await screen.getAllByRole('row');
  await waitFor(() => expect(rowFiltered.length).toBe(7));

});

test('Se é possível deletar um filtro previamente configurado', async () => {
  global.fetch = jest.fn(async () => ({
    json: async () => testData,
  }));
  render(<App />);
  await waitFor(() => expect(global.fetch).toBeCalled());

  const columnSelect = await screen.getByTestId('column-filter');
  const comparisonSelect = await screen.getByTestId('comparison-filter');
  const valueSelect = await screen.getByTestId('value-filter');
  const buttonFilter = await screen.getByTestId('button-filter');

  userEvent.selectOptions(columnSelect, 'population');
  userEvent.selectOptions(comparisonSelect, 'menor que');
  userEvent.clear(valueSelect);
  userEvent.type(valueSelect, '100000');
  userEvent.click(buttonFilter);

  const rowFiltered = await screen.getAllByRole('row');
  await waitFor(() => expect(rowFiltered.length).toBe(2));

  const deleteFilter = await screen.getByRole('button', { name: /apagar/i })
  expect(deleteFilter).toBeInTheDocument()
  userEvent.click(deleteFilter);

  const rowToDelete = screen.getAllByRole('row');
  // console.log(rowToDelete.length);
  expect(rowToDelete.length).toBe(11);
});
  
});