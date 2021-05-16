import React from 'react';
import { Sliders } from './features/sliders';
import { Main } from './features/main';
import {
  BrowserRouter as Router
} from "react-router-dom";
import LinkComponent from './features/sliders/linkMenu'
import SwitchComponent from './features/main/content'
import './App.css';

function App() {
  return (
    <Router>
      <div className="container is-widescreen">
        <aside className="sidebar">
          <Sliders component={LinkComponent} />
        </aside>
        <main className="page">
          <Main>
            <SwitchComponent />
          </Main>
        </main>
      </div>
    </Router>
  );
}

export default App;
