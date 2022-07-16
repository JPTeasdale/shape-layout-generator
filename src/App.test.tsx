import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Describe this picture and do not reload the page/i);
  expect(linkElement).toBeInTheDocument();
});
