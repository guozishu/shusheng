import React, { Children, useEffect } from 'react';
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
                <Child />
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

function Child(){
    return <div className="child">
        child
    </div>
}
