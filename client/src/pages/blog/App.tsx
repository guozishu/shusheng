import React from 'react';
import { Sliders } from './features/sliders';
import { Main } from './features/main';
import './App.css';

function App() {
  const [note,setNote] = React.useState("")
  return (
    <div className="app">
      <aside className="sidebar">
        <Sliders data={
          {setNote}
        } />
      </aside>
      <main className="page">
        <Main data={
          {
            note
          }
        } />
      </main>
    </div>
  );
}

export default App;
