import React, { useEffect, useState } from 'react';
import './index.css';

interface Category {
  id: number,
  name: string
}

export default function LeftMenu(props) {
  const [category, setCategory] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState<Category>({id:-1,name:''});
  const [showDropDown,setShowDropDown] = useState('is-hoverable')

  const [secondMenu, setSecondMenu] = useState([]);
  const [selectedSecondMenu,setSelectedSecondMenu] = useState<Category>({id:-1,name:''});
  const [showSecondMenu,setShowSecondMenu] = useState('is-hoverable')

  const [menuName, setMenuName] = useState('');

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
      }
    })
  }

  const handInMenu = function () {
    request({
      url: '/insert',
      params: {
        name: "articleType",
        fields: {
          "name": menuName
        }
      }
    }, function (res): void {
      if (!res.code) {
        queryFirstMenu()
        alert('新增成功.')
      } else {
        alert('新增失败.')
      }
    })
  }

  useEffect(() => {
    queryFirstMenu()
  }, [])

  const deleteCatetory = id => {
    if (window.confirm('确定删除当前菜单？')) {
      request({
        url: '/delete',
        params: {
          name: "articleType",
          fields: {
            id
          }
        }
      }, function (res): void {
        if (!res.code) {
          queryFirstMenu()
          alert('删除成功.')
        } else {
          alert('删除失败.')
        }
      })
    }
  }

  const choiceCategory = item => {
    setShowDropDown('')
    setSelectedCategory(item)
    setTimeout(()=>{
      setShowDropDown('is-hoverable')
    },300)
  }

  return (
    <div className="container">
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


      <div className={`dropdown ${showSecondMenu}`}>
        <div className="dropdown-trigger">
          <div className="button">
            <input value={selectedSecondMenu.name} onChange={e => setSelectedSecondMenu(e.target.value)} className="secondmenu__imput" type="text" />
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
                  onClick={() => choiceCategory(item)}
                >
                  {name}
                </a>
              })
            }
          </div>
        </div>
      </div>



      <div className="notification is-success is-light">
        <div className="block">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input className="input" value={menuName} onChange={e => setMenuName(e.target.value)} type="text" placeholder="一级菜单名" />
            </div>
            <div className="control">
              <button className="button is-primary" onClick={handInMenu} >新增</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
