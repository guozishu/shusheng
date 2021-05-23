import React, { useEffect, useState } from 'react';
import './index.css';

interface Menu {
  id: number,
  name: string
}

export default function FirstMenu(props) {

  const [category, setCategory] = useState([]);
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

  const queryFirstMenu = () => {
    request({
      url: '/query',
      params: {
        name: 'articleType',
        fields: 'id,name'
      }
    }, function (res) {
      setCategory(res.data)
    })
  }

  useEffect(() => {
    queryFirstMenu()
  }, [])

  return (
    <div className="container">
      {
        [1,2,3,4,5,6].map(index => {
          return <section key={index} className={`hero is-${colors[index%6]}`}>
          <div className="hero-body">
            <p className="title">
              Danger hero
            </p>
            <p className="subtitle">
              Danger subtitle
            </p>
          </div>
        </section>
        })
      }
    </div>
  );
}
