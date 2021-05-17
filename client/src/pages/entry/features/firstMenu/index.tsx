import React, { useEffect, useState } from 'react';
import './index.css';

interface Menu {
  id: number,
  name: string
}

export default function FirstMenu(props) {

  const [category, setCategory] = useState([]);
  const [menuName, setMenuName] = useState('')

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
        setCategory([...category, ...[{
          id: Date.now(),
          name: menuName
        }]])
        alert('新增成功.')
      } else {
        alert('新增失败.')
      }
    })
  }

  useEffect(() => {
    request({
      url: '/query',
      params: {
        name: 'articleType',
        fields: 'id,name'
      }
    }, function (res) {
      setCategory(res.data)
    })
  }, [])

  return (
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {
          category.map((item, index) => {
            const { id, name } = item
            return <div key={id} className="column is-one-quarter is-3">
              <div className="column__name">{name}</div>
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
              <button className="button is-primary" onClick={handInMenu} >提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
