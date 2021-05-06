import React from 'react';
import { Sliders } from './features/sliders';
import { Main } from './features/main';
import './App.css';

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <Sliders />
      </aside>
      <main className="page">
        <Main />
      </main>
    </div>
  );
}

export default App;
