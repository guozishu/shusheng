import React, { useState } from 'react';
import constants from '../../constants';
import {
  Link,
  useLocation
} from "react-router-dom";

function useQuery() {
  return useLocation().pathname.replace(/\//g,'')
}

export default function LinkComponent() {
  const [pathName,setPathName] = useState('first_menu');
  let query = useQuery()
  if (query === 'face') {
    query = 'first_menu'
  }
  return (
    <>
      {
        Object.entries(constants.FACE_SLIDERS).map((item, index) => {
          const pagePath = item[0].toLowerCase();
          return <li key={index} onClick={() => setPathName(pagePath)}>
            <Link className={`${query ===pagePath?'active':''} sidebar-link`} to={pagePath}>{item[1].DISPLAY_NAME}</Link>
          </li>
        })
      }
    </>
  )
}