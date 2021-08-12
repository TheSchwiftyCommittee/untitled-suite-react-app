import React from 'react';
import { render, screen } from '@testing-library/react';
import { StandardRoute } from './StandardRoute';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../pages/Home';


describe('Standard route', () => {
  test('Loads the component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <StandardRoute component={Home} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('title')).toBeTruthy();
  });

  test('Loads the footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <StandardRoute component={Home} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('footer')).toBeTruthy();
  });
});