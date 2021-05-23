import React, { useEffect, useState } from 'react';
import './index.css';

interface Menu {
  id: number,
  name: string
}

export default function FirstMenu(props) {

  const [notes, setNotes] = useState([]);
  const [colors] = useState(['primary','link','info','success','warning','danger'])

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

  const queryNoteList = args => {
    const { pageSize, pageIndex, isPagination } = args;
    let params = {
      name: 'articleInfo LEFT JOIN articleCategory ON articleInfo.cate_Id=articleCategory.cust_id',
      fields: 'articleInfo.id,title,articleCategory.`name`',
      condition: `isOnline=1 ORDER BY articleInfo.id LIMIT ${pageIndex},${pageSize}`
    }
    if (isPagination) {
      params = {
        ...{
          needTotalPage: {
            isPagination: true,
            name: 'articleInfo',
            fields: 'COUNT(id) as totalPage'
          }
        },
        ... params
      }
    }
    request({
      url: '/query',
      params
    }, function (res) {
      setNotes(res.data)
    })
  }

  useEffect(() => {
    queryNoteList({ pageSize: 12, pageIndex: 0, isPagination: true })
  }, [])

  return (
    <div className="container">
      {
        notes.map((item, index) => {
          const {id, title, name} = item
          return <section key={id} className={`hero is-${colors[index%6]}`}>
          <div className="hero-body">
            <p className="title">
              {title}
            </p>
            <p className="subtitle">
              {name}
            </p>
          </div>
        </section>
        })
      }
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <a className="pagination-previous">上一页</a>
        <a className="pagination-next">下一页</a>
        <ul className="pagination-list">
          <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
          <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
          <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
        </ul>
      </nav>
    </div>
  );
}
