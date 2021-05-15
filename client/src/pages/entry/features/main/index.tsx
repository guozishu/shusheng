import React, { Children, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import  { usePortal } from '../../../components/index';
import './index.css';

const Portal = ({id, children}) => {
    const target = usePortal(id);
    return createPortal(children, target);
}

function Modal(props){
    let el = document.createElement('div');

    useEffect(() => {
        document.getElementById('root')?.appendChild(el)
    }, [])

    return createPortal(
        props.children,
        el
    )
}


export function Main() {
    return (
        <div className="content">
            <Modal>
                <Login />
            </Modal>
            <Portal id="root">
                <p>portal</p>
            </Portal>
            <div className="tile">
                <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-primary">
                        <p className="title">菜单编辑</p>
                        <p className="subtitle">编辑</p>
                    </article>
                    <article className="tile is-child notification is-warning">
                        <p className="title">博客编辑</p>
                        <p className="subtitle">编辑</p>
                    </article>
                </div>
                <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-link">
                        <p className="title">Vertical...</p>
                        <p className="subtitle">Top tile</p>
                    </article>
                    <article className="tile is-child notification is-success">
                        <p className="title">...tiles</p>
                        <p className="subtitle">Bottom tile</p>
                    </article>
                </div>
                <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-danger">
                        <p className="title">Vertical...</p>
                        <p className="subtitle">Top tile</p>
                    </article>
                    <article className="tile is-child notification is-info">
                        <p className="title">...tiles</p>
                        <p className="subtitle">Bottom tile</p>
                    </article>
                </div>
            </div>
        </div>
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
            method: 'POST'
          })
          .then(response => response.json())
          .then(res => {
              if (!res.code) {
                window.location.reload()
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
