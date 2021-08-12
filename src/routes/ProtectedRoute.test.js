import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from './ProtectedRoute';
import { MemoryRouter } from 'react-router-dom';
import Tasker from "../pages/Tasker";
import CreateNewList from '../pages/CreateNewList';

const currentUser = true;

describe('Protected route works with authenticated users', () => {
  test('can log into Tasker when user is authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ProtectedRoute user={currentUser} component={Tasker} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('title')).toBeTruthy();
  });
  test('can log into CreateNewList when user is authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ProtectedRoute user={currentUser} component={CreateNewList} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('title')).toBeTruthy();
  });
});