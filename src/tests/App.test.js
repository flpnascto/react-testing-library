import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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

test('testa conjunto de links de navegação', () => {
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
