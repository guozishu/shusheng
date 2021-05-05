import React from 'react';
import { Sliders } from './features/sliders';
import './App.css';

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <Sliders />
      </aside>
      <main className="page">
        page
      </main>
    </div>
  );
}

export default App;
