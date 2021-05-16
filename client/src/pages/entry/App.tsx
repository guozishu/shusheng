import React from 'react';
import { Sliders } from './features/sliders';
import { Main } from './features/main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import constants from './features/sliders/constants';
import './App.css';

function Child() {
  let { id } = useParams();
  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

function SwitchComponent(){
  return (
<Switch>
  <Route path="/:id" children={<Child />} />
</Switch>
  )
}

function LinkComponent(){
  return (
    <>
    {
      Object.entries(constants.FACE_SLIDERS).map((item,index) => {
          return <li key={index}> 
              <Link className="active sidebar-link" to={item[0].toLowerCase()}>{item[1]}</Link>
          </li>
      })
  }
    </>
  )
}

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
    <SwitchComponent />
    </Router>
  );
}

export default App;
