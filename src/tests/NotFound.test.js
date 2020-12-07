import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando se no componente NotFound', () => {
  it('existe um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const elementH2 = getByRole('heading', { name: /age requested not found/i });
    expect(elementH2).toBeInTheDocument();
  });

  it('existe uma imagem específica', () => {
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { getByAltText } = render(<NotFound />);
    expect(getByAltText(/Pikachu crying because the page requested was not found/i))
      .toHaveAttribute('src', imgUrl);
  });
});
