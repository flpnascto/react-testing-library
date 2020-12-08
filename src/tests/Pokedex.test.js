import React from 'react';
import { fireEvent } from '@testing-library/react';

import Pokedex from '../components/Pokedex';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

const testPokemons = ['Pikachu', 'Charmander', 'Dragonair'];
const pokemons = data.filter((pokemon) => testPokemons.includes(pokemon.name));
const types = data.map((pokemon) => pokemon.type);
// https://wsvincent.com/javascript-remove-duplicates-array/
const allTypes = [...new Set(types)];

describe('Testando se no componente pokedex', () => {
  it('existe um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const elementH2 = getByText(/Encountered pokémons/i);
    expect(elementH2).toBeInTheDocument();
    expect(elementH2.tagName).toBe('H2');
  });

  it('se existe os botões de filtro', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ {} }
      />,
    );
    const allTypeButtons = getAllByTestId('pokemon-type-button');
    expect(allTypeButtons).toHaveLength(allTypes.length);

    allTypes.forEach(
      (type) => expect(getByRole('button', { name: type })).toBeInTheDocument(),
    );
  });

  it('se existe o botão para resetar os filtros', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ {} }
      />,
    );
    const allFilterButton = getByRole('button', { name: /All/i });
    expect(allFilterButton).toBeInTheDocument();
    fireEvent.click(allFilterButton);
    expect(getByTestId('pokemon-name').textContent).toBe(data[0].name);
  });

  it('se existe o botão Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const nextButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('se é exibido o próximo pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const nextButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(getByText(pokemons[1].name)).toBeInTheDocument();
  });

  it('se retorna para o primeiro pokemon ao atingir o fim da lista', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />,
    );
    const nextButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(getByText(pokemons[1].name)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(getByText(pokemons[2].name)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('se o filtro de pokemons está funcionando corretamente', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ {} }
      />,
    );
    const nextButton = getByRole('button', { name: /Próximo pokémon/i });
    allTypes.forEach((type) => {
      const typeLength = data.filter((pokemon) => pokemon.type === type).length;
      fireEvent.click(getByRole('button', { name: type }));
      if (typeLength === 1) {
        expect(nextButton).toBeDisabled();
      }
      // exibido apenas um Pokémon por vez
      expect(getAllByTestId('pokemon-name')).toHaveLength(1);
    });
  });
});
