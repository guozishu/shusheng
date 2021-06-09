import React from 'react';
import './Index.css'

export function Home() {
    return (
        <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
                <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-primary">
                            <p className="title">数据结构</p>
                            <p className="subtitle">Data structure</p>
                        </article>
                        <article className="tile is-child notification is-warning">
                            <p className="title">算法</p>
                            <p className="subtitle">Algorithm</p>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-info">
                            <p className="title">前端</p>
                            <p className="subtitle">Front-end</p>
                            <figure className="image is-4by3">
                            </figure>
                        </article>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-danger">
                        <p className="title">系统</p>
                        <p className="subtitle">Linux</p>
                        <div className="content">
                        </div>
                    </article>
                </div>
            </div>
            <div className="tile is-parent">
                <article className="tile is-child notification is-success">
                    <div className="content">
                        <p className="title">后端</p>
                        <p className="subtitle">Back-end</p>
                        <div className="content">
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
