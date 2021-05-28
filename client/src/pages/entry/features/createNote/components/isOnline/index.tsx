import React from 'react';
import './index.css';

export default function Index(props) {
  const {isOnline, setIsOnline} = props.data


  const isShowOnline = e => {
    setIsOnline(e.target.checked)
  }

  return <label className="checkbox">
  <input type="checkbox" checked={isOnline} onChange={isShowOnline} />
  是否发布
</label>
}
