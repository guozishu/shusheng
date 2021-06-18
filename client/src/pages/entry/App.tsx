import React,{ useState }  from 'react';
import { createPortal } from 'react-dom';
import { Sliders } from './features/sliders';
import { Main } from './features/main';
import {
  BrowserRouter as Router
} from "react-router-dom";
import LinkComponent from './features/sliders/linkMenu'
import SwitchComponent from './features/main/content'
import  { usePortal } from '../components/index';
import './App.css';

const Portal = ({id, children}) => {
  const target = usePortal(id);
  return createPortal(children, target);
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
        <Portal id="root">
                <Login />
            </Portal>
      </div>
    </Router>
  );
}

function Login() {
  const [user,setUser] = useState('');
  const [pwd,setPwd] = useState('');
  const [isShow] = useState(parseInt(document.getElementById('login').value, 10))
  const handInLogin = () => {
      fetch('/login', {
          body: JSON.stringify({
              user,
              pwd
          }),
          headers: {
              'content-type': 'application/json'
            },
          method: 'POST'
        })
        .then(response => response.json())
        .then(res => {
            if (res.code === 0) {
              setTimeout(() => {
                window.location.reload()
              },2000)
            }
        })
     
  }
  return <div className={`content modal ${isShow?'':'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
          <div className="box">
          <div className="field">
              <p className="control has-icons-left has-icons-right">
                  <input className="input" onChange={e => setUser(e.target.value)} value={user} type="email" placeholder="账号" />
                  <span className="icon is-small is-left">
                      <i className="fas icon-user"></i>
                  </span>
              </p>
          </div>
          <div className="field">
              <p className="control has-icons-left">
                  <input className="input" onChange={e => setPwd(e.target.value)} value={pwd} type="password" placeholder="密码" />
                  <span className="icon is-small is-left">
                      <i className="fas icon-lock"></i>
                  </span>
              </p>
          </div>
          <div className="buttons">
              <button onClick={handInLogin} className="button is-success">登录</button>
          </div>
          </div>
      </div>
  </div>
}

export default App;
