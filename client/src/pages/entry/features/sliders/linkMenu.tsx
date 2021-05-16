import React from 'react';
import constants from '../../constants';
import {
  Link,
} from "react-router-dom";

export default function LinkComponent() {
  return (
    <>
      {
        Object.entries(constants.FACE_SLIDERS).map((item, index) => {
          return <li key={index}>
            <Link className="sidebar-link" to={item[0].toLowerCase()}>{item[1]}</Link>
          </li>
        })
      }
    </>
  )
}