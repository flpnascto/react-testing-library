import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Testando se no componente Pokemon', () => {
  it('exibe o nome correto', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ {} }
      />,
    );
    expect(getByTestId('pokemon-name').textContent).toBe(data[0].name);
  });

  it('exibe o tipo correto', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ {} }
      />,
    );
    expect(getByTestId('pokemonType').textContent).toBe(data[0].type);
  });

  it('exibe o peso e a unidade corretos', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ {} }
      />,
    );
    const { value } = data[0].averageWeight;
    const { measurementUnit } = data[0].averageWeight;
    expect(getByTestId('pokemon-weight').textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  it('exibe a imagem correta', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ {} }
      />,
    );
    // expect(getAllByRole('img').find((img) => img.src === data[0].image));
    expect(getByAltText(`${data[0].name} sprite`)).toHaveAttribute('src', data[0].image);
  });

  it('existe o link para página de detalhes com a rota correta', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ {} }
      />,
    );
    // expect(getByText(/More Details/i)).toBeInTheDocument();
    // expect(getByRole('link', { name: /More Details/i })).toBeInTheDocument();
    const detailsLink = getByRole('link', { name: /More Details/i });
    const detailsPath = `/pokemons/${data[0].id}`;
    expect(detailsLink).toHaveAttribute('href', detailsPath);
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(detailsPath);
    // expect(getByText(`${data[0].name} Details`)).toBeInTheDocument();
  });

  it('exibe ícone caso seja favorito', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ data[0] }
        isFavorite={ data[0].id }
      />,
    );

    expect(getByAltText(`${data[0].name} is marked as favorite`))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});

// imagem

// const image = getByRole('img');
//     const srcExpected = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
//     expect(image.src).toBe(srcExpected);

// TAg Name
// expect(heading.tagName).toBe('H2');

// LINK
// expect(about.href).toBe('http://localhost/about');
