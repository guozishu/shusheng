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
  const currentSlider = constants.FACE_SLIDERS[id.toUpperCase()]
  const menulist = { 
    first_menu: () => React.lazy(() => import('../firstMenu/index')),  
    creare_notes: () => React.lazy(() => import('../createNote/index')), 
    note_list: () => React.lazy(() => import('../noteList/index')), 
    update_notes: () => React.lazy(() => import('../updateNote/index')), 
    others: () => React.lazy(() => import('../firstMenu/index'))
  }
  const Menu = menulist[id]()
  return (
    <div>
      <h1>{currentSlider.DISPLAY_NAME}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Menu />
      </Suspense>
    </div>
  );
}