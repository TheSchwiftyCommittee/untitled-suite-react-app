import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from './ProtectedRoute';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../pages/Home';

const currentUser = true;

describe('Protected route works with authenticated users', () => {
  test('can login when user is authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ProtectedRoute user={currentUser} component={Home} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('title')).toBeTruthy();
  });
});