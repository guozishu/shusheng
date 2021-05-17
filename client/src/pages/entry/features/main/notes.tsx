import React, {Suspense} from 'react';
import {
  useParams
} from "react-router-dom";
import constants from '../../constants'

export default function Note() {
  let { id } = useParams();
  if (id === 'face') {
    id = 'first_menu'
  }
  const Menu = React.lazy(() => import('../firstMenu/index'));
  return (
    <div>
      <h1>{constants.FACE_SLIDERS[id.toUpperCase()]}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Menu />
      </Suspense>
    </div>
  );
}