import React, { useState } from 'react';
import constants from '../../constants';
import {
  Link
} from "react-router-dom";

export default function LinkComponent() {
  let myRef = React.createRef();
  const [pathName,setPathName] = useState('first_menu');
  return (
    <>
      {
        Object.entries(constants.FACE_SLIDERS).map((item, index) => {
          const pagePath = item[0].toLowerCase();
          return <li key={index} onClick={() => setPathName(pagePath)}>
            <Link className={`${pathName ===pagePath?'active':''} sidebar-link`} to={pagePath}>{item[1].DISPLAY_NAME}</Link>
          </li>
        })
      }
    </>
  )
}