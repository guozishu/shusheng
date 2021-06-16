import React from 'react';
import './index.css';

export default function Index(props) {
  const { createTitle, setCreateTitle } = props.data

  return (
    <input className="input is-primary" value={createTitle} onChange={e => setCreateTitle(e.target.value)} type="text" placeholder="Primary input"/>
  );
}
