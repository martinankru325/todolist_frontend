import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { queryClient } from 'app/providers/queryClient';
import { store } from 'app/providers/store/store';

import { App } from '../App';

import 'normalize.css';
import '../styles/index.scss';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
