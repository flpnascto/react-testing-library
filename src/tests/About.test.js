import React from 'react';
import { render } from '@testing-library/react';

import About from '../components/About';

// beforeEach(() => {
//   const { getByRole } = render(<About />);
// });

describe('Testando se no componente About', () => {
  it('existe um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const elementH2 = getByRole('heading', { name: /About Pokédex/i });
    expect(elementH2).toBeInTheDocument();
  });

  it('existem dois parágrafos', () => {
    const { container } = render(<About />);
    const p = container.querySelectorAll('p');
    const numbersOfParagraphs = 2;
    expect(p.length).toBe(numbersOfParagraphs);
  });

  it('existe uma imagem específica', () => {
    const imgUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { getByAltText } = render(<About />);
    expect(getByAltText(/Pokédex/i)).toHaveAttribute('src', imgUrl);
  });
});
