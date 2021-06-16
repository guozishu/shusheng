import React from 'react';
import './index.css';

export default function Index(props) {
  const {isOnline, setIsOnline} = props.data

  return <label className="checkbox">
  <input type="checkbox" checked={isOnline} onChange={e => setIsOnline(e.target.checked)} />
  是否发布
</label>
}
