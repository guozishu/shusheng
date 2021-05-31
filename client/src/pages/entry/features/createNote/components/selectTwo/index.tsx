import React from 'react';
import './index.css';

export default function Index(props) {
  let {
    secondMenu, setSecondMenu,
    selectedSecondMenu,setSelectedSecondMenu,
    showSecondMenu,setShowSecondMenu,
  } = props.data

  const choiceSecondCategory = item => {
    setShowSecondMenu('')
    setSelectedSecondMenu(item)
    setTimeout(()=>{
      setShowSecondMenu('is-hoverable')
    },300)
  }

  const inputOnChange = e => {
    setSelectedSecondMenu({
      id: Date.now(),
      name: e.target.value
    })
  }

  return (
    <div className={`dropdown ${showSecondMenu}`}>
    <div className="dropdown-trigger">
      <div className="button">
        <input value={selectedSecondMenu.name} onChange={inputOnChange} className="secondmenu__imput" type="text" />
        <span className="icon is-small">
          <i className="fas icon-angle-down"></i>
        </span>
      </div>
    </div>
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {
          secondMenu.map(item => {
            const { id, name } = item
            return <a
              key={id}
              className={`dropdown-item ${id == selectedSecondMenu.id ? 'item__hover' : ''}`}
              onClick={() => choiceSecondCategory(item)}
            >
              {name}
            </a>
          })
        }
      </div>
    </div>
  </div>
  );
}
