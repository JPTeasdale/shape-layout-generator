import React from 'react';
import logo from './logo.svg';

import './App.css';
import { Layout } from './layout/Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Describe this picture and do not reload the page.
        </p>
        <Layout />
      </header>
    </div>
  );
}

export default App;
