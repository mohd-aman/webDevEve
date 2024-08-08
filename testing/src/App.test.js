import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); // inside this testcase we will test App component.
  const linkElement = screen.getByText('learn react');
  expect(linkElement).toBeInTheDocument();
});
