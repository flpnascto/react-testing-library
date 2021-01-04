import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import data from '../data';

const testPokemon = data[0];
const favoritePokemon = () => { };

describe('As informações detalhadas de PokemonDetails', () => {
  it('exibe o título correto', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [testPokemon.id]: false } }
        match={ { params: { id: testPokemon.id.toString() } } }
        pokemons={ data }
        onUpdateFavoritePokemons={ favoritePokemon }
      />,
    );
    expect(getByText(`${data[0].name} Details`)).toBeInTheDocument();
  });

  it('não exibe link para detalhes', () => {
    const { queryByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [testPokemon.id]: false } }
        match={ { params: { id: testPokemon.id.toString() } } }
        pokemons={ data }
        onUpdateFavoritePokemons={ favoritePokemon }
      />,
    );
    expect(queryByText(/More Details/i)).not.toBeInTheDocument();
  });

  it('exibe o título Summary', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [testPokemon.id]: false } }
        match={ { params: { id: testPokemon.id.toString() } } }
        pokemons={ data }
        onUpdateFavoritePokemons={ favoritePokemon }
      />,
    );
    const elementH2 = getByText(/Summary/i);
    expect(elementH2).toBeInTheDocument();
    expect(elementH2.tagName).toBe('H2');
  });

  it('exibe parágrafo com resumo do Pokémon', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [testPokemon.id]: false } }
        match={ { params: { id: testPokemon.id.toString() } } }
        pokemons={ data }
        onUpdateFavoritePokemons={ favoritePokemon }
      />,
    );
    const pokemonSummary = getByText(testPokemon.summary);
    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummary.tagName).toBe('P');
  });
});

describe('A seção de mapas de PokemonDetails', () => {
  it('exibe título Game Locations', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [testPokemon.id]: false } }
        match={ { params: { id: testPokemon.id.toString() } } }
        pokemons={ data }
        onUpdateFavoritePokemons={ favoritePokemon }
      />,
    );
    const elementH2 = getByText(`Game Locations of ${testPokemon.name}`);
    expect(elementH2).toBeInTheDocument();
    expect(elementH2.tagName).toBe('H2');
  });

  it('exibe todas as localizações', () => {
    const { getAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [testPokemon.id]: false } }
        match={ { params: { id: testPokemon.id.toString() } } }
        pokemons={ data }
        onUpdateFavoritePokemons={ favoritePokemon }
      />,
    );

    const locations = getAllByAltText(`${testPokemon.name} location`);
    expect(locations.length).toBe(testPokemon.foundAt.length);
    expect(locations[0].src).toBe(testPokemon.foundAt[0].map);
    expect(locations[1].src).toBe(testPokemon.foundAt[1].map);
  });
});

describe('A funcionalidade favoritar de PokemonDetails', () => {
  it('exibe o checkbox', () => {
    const { getByRole, queryByLabelText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [testPokemon.id]: false } }
        match={ { params: { id: testPokemon.id.toString() } } }
        pokemons={ data }
        onUpdateFavoritePokemons={ favoritePokemon }
      />,
    );

    const favoriteCheckbox = getByRole('checkbox', { id: favorite });
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(queryByLabelText(/Pokémon favoritado?/)).toBeInTheDocument();
    fireEvent.change(favoriteCheckbox, { target: { checked: true } });
    expect(favoriteCheckbox.checked).toEqual(true);
  });
});
