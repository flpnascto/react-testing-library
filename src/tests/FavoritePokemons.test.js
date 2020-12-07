import React from 'react';
import { render } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando se no componente FavoritePokemons', () => {
  it('exibe a mensagem `No favorite pokemon found` se não tiver nenhum pokemon favorito',
    () => {
      const mensagem = 'No favorite pokemon found';
      const { getByText } = render(<FavoritePokemons />);
      expect(getByText(mensagem)).toBeInTheDocument();
    });
});
