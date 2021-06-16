import React, { useEffect, useState } from 'react';
import './index.css';

interface Menu {
  id: number,
  name: string
}

export default function FirstMenu(props) {

  const [category, setCategory] = useState([]);
  const [menuName, setMenuName] = useState('')
  const [firstSelectedId,setFirstSelectedId] = useState<number>(-1)

  const [secondCategory, setSecondCategory] = useState([]);
  const [secondMenuName, setSecondMenuName] = useState('')

  const request = function (params) {
    return fetch(params.url, {
      body: JSON.stringify(params.params),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
  }

  const queryFirstMenu = () => {
    request({
      url: '/query',
      params: {
        name: 'articleType',
        fields: 'id,name'
      }
    }).then(function (res) {
      setCategory(res.data)
    })
  }

  const querySecondCate = pid => {
    setFirstSelectedId(pid)
    request({
      url: '/query',
      params: {
        name: 'articleCategory',
        fields: 'id,name',
        condition: `pid=${pid}`
      }
    }).then(function (res) {
      setSecondCategory(res.data)
    })
  }

  const handInMenu = function () {
    if (window.confirm('确定新增当前菜单？')) {
      if (!menuName) {
        alert('菜单不能为空.')
        return ;
      }
      request({
        url: '/insert',
        params: {
          name: "articleType",
          fields: {
            "name": menuName
          }
        }
      }).then(function (res): void {
        if (!res.code) {
          queryFirstMenu()
          alert('新增成功.')
        } else {
          alert('新增失败.')
        }
      })
    }
    
  }

  const handInSecondMenu = function () {
    if (window.confirm('确定新增当前菜单？')) {
      if (!secondMenuName || firstSelectedId < 0) {
        alert('菜单或一级菜单不能为空.')
        return ;
      }
      request({
        url: '/insert',
        params: {
          name: "articleCategory",
          fields: {
            pid: firstSelectedId,
            name: secondMenuName,
            cust_id: Date.now().toString()
          }
        }
      }).then(function (res): void {
        if (!res.code) {
          querySecondCate(firstSelectedId)
          alert('新增成功.')
        } else {
          alert('新增失败.')
        }
      })
    }
    
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
      }).then(function (res): void {
        if (!res.code) {
          queryFirstMenu()
          alert('删除成功.')
        } else {
          alert('删除失败.')
        }
      })
    }
  }

  const deleteSecondCatetory = id => {
    if (window.confirm('确定删除当前菜单？')) {
      request({
        url: '/delete',
        params: {
          name: "articleCategory",
          fields: {
            id
          }
        }
      }).then(function (res): void {
        if (!res.code) {
          querySecondCate(firstSelectedId)
          alert('删除成功.')
        } else {
          alert('删除失败.')
        }
      })
    }
  }

  return (
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {
          category.map((item, index) => {
            const { id, name } = item
            return <div key={id} className="column is-one-quarter is-3">
              <div className="column__name" onClick={() => {querySecondCate(id)}}>
                {name}<button onClick={() => deleteCatetory(id)} className="delete"></button>
              </div>
            </div>
          })
        }
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
      <h2>二级菜单</h2>
      <div className="columns is-multiline is-mobile">
        {
          secondCategory.map((item, index) => {
            const { id, name } = item
            return <div key={id} className="column is-one-quarter is-3">
              <div className="column__name is-danger">
                {name}<button onClick={() => deleteSecondCatetory(id)} className="delete"></button>
              </div>
            </div>
          })
        }
      </div>
      <div className="notification is-success is-light">
        <div className="block">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input className="input" value={secondMenuName} onChange={e => setSecondMenuName(e.target.value)} type="text" placeholder="二级菜单名" />
            </div>
            <div className="control">
              <button className="button is-primary" onClick={handInSecondMenu} >新增</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
