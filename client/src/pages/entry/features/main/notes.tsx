import React, {Suspense} from 'react';
import {
  useParams
} from "react-router-dom";

export default function Note() {
  let { id } = useParams();
  const Menu = React.lazy(() => import('./menuContent'));
  return (
    <div>
      <h1>ID: {id}</h1>
      <Suspense fallback={<div>Loading...</div>}>
      <Menu />
      </Suspense>
      
      <div className="columns is-multiline is-mobile">
        <div className="column is-one-quarter is-3">
        First column
        </div>
        <div className="column is-one-quarter is-3">
          Second column
        </div>
        <div className="column is-one-quarter is-3">
          Third column
        </div>
        <div className="column is-one-quarter is-3">
          Fourth column
        </div>
        <div className="column is-one-quarter is-3">
        First column
        </div>
        <div className="column is-one-quarter is-3">
          Second column
        </div>
        <div className="column is-one-quarter is-3">
          Third column
        </div>
        <div className="column is-one-quarter is-3">
          Fourth column
        </div>
        <div className="column is-one-quarter is-3">
        First column
        </div>
        <div className="column is-one-quarter is-3">
          Second column
        </div>
        <div className="column is-one-quarter is-3">
          Third column
        </div>
        <div className="column is-one-quarter is-3">
          Fourth column
        </div>
        <div className="column is-one-quarter is-3">
        First column
        </div>
        <div className="column is-one-quarter is-3">
          Second column
        </div>
        <div className="column is-one-quarter is-3">
          Third column
        </div>
        <div className="column is-one-quarter is-3">
          Fourth column
        </div>
      </div>
    </div>
  );
}