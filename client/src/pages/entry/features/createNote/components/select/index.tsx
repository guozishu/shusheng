import React, { useEffect, useState } from 'react';
import './index.css';

interface Category {
  id: number,
  name: string
}

export default function Index(props) {
  const {
    category,
    setCategory,
    selectedCategory,
    setSelectedCategory,
    showDropDown,
    setShowDropDown,
    secondMenu, setSecondMenu,
    selectedSecondMenu,setSelectedSecondMenu,
    showSecondMenu,setShowSecondMenu,
  } = props.data

  const request = function (params, callback) {
    fetch(params.url, {
      body: JSON.stringify(params.params),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => response.json())
      .then(res => {
        callback(res)
      })
  }

  const queryFirstMenu = () => {
    request({
      url: '/select',
      params: {
        name: 'articleType',
        fields: 'id,name'
      }
    }, function (res) {
      if (!res.code) {
        setSelectedCategory(res.data[0])
        setCategory(res.data)
        querySecondMenu(res.data[0].id)
      }
    })
  }

  const querySecondMenu = pid => {
    request({
      url: '/select',
      params: {
        name: 'articleCategory',
        fields: 'id,name,pid,cust_id',
        condition: `pid=${pid}`
      }
    }, function (res) {
      if (!res.code) {
        setSelectedSecondMenu(res.data[0])
        setSecondMenu(res.data)
        if (res.data.length) {
          setShowSecondMenu('is-hoverable')
        }
      }
    })
  }

  useEffect(() => {
    queryFirstMenu();
    return () => {
      queryFirstMenu();
    }
  }, [])

  const choiceCategory = item => {
    setShowDropDown('')
    setSelectedCategory(item)
    querySecondMenu(item.id)
    setTimeout(()=>{
      setShowDropDown('is-hoverable')
    },300)
  }

  return (
    <div className={`dropdown ${showDropDown}`}>
    <div className="dropdown-trigger first__menu">
      <div className="button">
        <span>{selectedCategory.name}</span>
        <span className="icon is-small">
          <i className="fas icon-angle-down"></i>
        </span>
      </div>
    </div>
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {
          category.map(item => {
            const { id, name } = item
            return <a
              key={id}
              className={`dropdown-item ${id == selectedCategory.id ? 'item__hover' : ''}`}
              onClick={() => choiceCategory(item)}
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
