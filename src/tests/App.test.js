import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('se conjunto de links de navegação', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getAllByRole('link')[0];
  expect(homeLink).toHaveTextContent(/Home/i);

  const aboutLink = getAllByRole('link')[1];
  expect(aboutLink).toHaveTextContent(/About/i);

  const favouriteLink = getAllByRole('link')[2];
  expect(favouriteLink).toHaveTextContent(/Favorite Pokémons/i);
});

test('se ao clicar em Home acessa a rota "/"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('se ao clicar em About acessa a rota "/about"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/about/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('se ao clicar em Favorite Pokémons acessa a rota "/favorites"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('se um caminho não existente renderiza componebte NotFound', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/isto-não-existe');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
