import React from 'react';
import { render, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import App from '../App';

it('renders without error', async () => {
  await act(async () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );
  });
});
