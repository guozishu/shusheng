import React, { useEffect, useState } from 'react';
import './index.css';

export default function FirstMenu(props) {

  const [notes, setNotes] = useState([]);
  const [colors] = useState(['primary','link','info','success','warning','danger'])

  const [pageIndex,setPageIndex] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [middlePage,setMiddlePage] = useState<number[]>([]);

  const [keyword,setKeyword] = useState<string>('')

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
      if (!res.code) {
        setNotes(res.data);
        const pageIndex = Math.ceil(res.total.totalPage/12)
        setPageIndex(pageIndex);
        const middlePage: number[] = []
        let calculatePage = currentPage;
        while(calculatePage < pageIndex - 1) {
          middlePage.push(++calculatePage)
        }
        setMiddlePage(middlePage);
      }
    })
  }

  useEffect(() => {
    queryNoteList({ pageSize: 12, pageIndex: 0, isPagination: true })
  }, [])

  const onPagination = page => {
    if (page > 0 && page <= pageIndex) {
      setCurrentPage(page);
    }
    if (page - 2 > 0 && page + 1 < pageIndex) {
      const middlePage = [ page - 1, page , page + 1 ];
      setMiddlePage(middlePage);
    }
    if (page === 1) {
      const middlePage: number[] = []
      let calculatePage = 1;
      while(calculatePage < pageIndex - 1) {
        middlePage.push(++calculatePage)
      }
      setMiddlePage(middlePage);
    }
    if (page === pageIndex) {
      const middlePage: number[] = [];
      let calculatePage = pageIndex
      while(calculatePage > 2) {
        middlePage.push(--calculatePage)
      }
      setMiddlePage(middlePage.sort((a,b)=>a-b));
    }
  }

  return (
    <div className="container">
      <div className="notification is-success is-light">
        <div className="block">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input className="input" value={keyword} onChange={e=>setKeyword(e.target.value)} type="text" placeholder="关键字" />
            </div>
            <div className="control">
              <button className="button is-primary">搜索</button>
            </div>
          </div>
        </div>
      </div>
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
      <nav className="pagination is-centered">
        <a onClick={() => onPagination(currentPage-1)} className="pagination-previous">上一页</a>
        <a onClick={() => onPagination(currentPage+1)} className="pagination-next">下一页</a>
        <ul className="pagination-list">
          <li><a onClick={() => onPagination(1)} className={`pagination-link ${currentPage === 1?'is-current':''}`}>1</a></li>
          {
            currentPage - 1 > 3 && <li><span className="pagination-ellipsis">&hellip;</span></li>
          }
          {
            middlePage.map(page => {
              return <li key={page}><a onClick={() => onPagination(page)} className={`pagination-link ${currentPage === page?'is-current':''}`}>{page}</a></li>
            })
          }
          {
            pageIndex - currentPage > 3 && <li><span className="pagination-ellipsis">&hellip;</span></li>
          }
          <li><a onClick={() => onPagination(pageIndex)} className={`pagination-link ${currentPage === pageIndex?'is-current':''}`}>{pageIndex}</a></li>
        </ul>
      </nav>
    </div>
  );
}
