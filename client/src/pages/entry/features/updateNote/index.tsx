import React, { useEffect, useState } from 'react';
import './index.css';
import Editor from '../createNote/components/editor/index';
import Select from '../createNote/components/select/index';
import SelectTwo from '../createNote/components/selectTwo/index';
import CreateInput from '../createNote/components/createInput/index';
import IsOnline from '../createNote/components/isOnline/index';
import {
  useLocation
} from "react-router-dom";

interface Category {
  id: number,
  name: string
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LeftMenu(props) {
  const query = useQuery();
  const [category, setCategory] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState<Category>({id:-1,name:''});
  const [showDropDown,setShowDropDown] = useState('is-hoverable')

  const [secondMenu, setSecondMenu] = useState([]);
  const [selectedSecondMenu,setSelectedSecondMenu] = useState<Category>({id:-1,name:''});
  const [showSecondMenu,setShowSecondMenu] = useState('')

  const [customSecondMenu,setCustomSecondMenu] = useState<Category>({id:-1,name:''});

  const [note,setNote] = useState("## 更新笔记")

  const [noteId, setNoteId] = useState(-1)

  const [isOnline, setIsOnline] = useState(false);

  const [createTitle, setCreateTitle] = useState('');

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

  const queryNote = id => {
    request({
      url: '/select',
      params: {
        name: 'articleInfo',
        fields: 'id,cate_Id,title,content,isOnline',
        condition: `id=${id}`
      }
    })
    .then(function (res) {
      if (!res.code) {
        setNote(decodeURIComponent(res.data[0].content));
        setNoteId(res.data[0].id)
        queryCate(res.data[0].cate_Id);
        setCreateTitle(res.data[0].title)
        setIsOnline(res.data[0].isOnline)
      }
    })
  }

  const queryAllCate = pid => {
    request({
      url: '/select',
      params: {
        name: 'articleCategory',
        fields: 'id,name,pid,cust_id',
        condition: `pid=${pid}`
      }
    }).then(function (res) {
      if (!res.code) {
        setSecondMenu(res.data)
        if (res.data.length) {
          setShowSecondMenu('is-hoverable')
        }
      }
    })
  }

  const queryCate = cust_id => {
    request({
      url: '/select',
      params: {
        name: 'articleCategory',
        fields: 'id,name,pid',
        condition: `cust_id=${cust_id}`
      }
    })
    .then(function (res) {
      if (!res.code) {
        setSelectedSecondMenu(res.data[0])
        queryType(res.data[0].pid)
        queryAllCate(res.data[0].pid)
      }
    })
  }

  const queryType = pid => {
    request({
      url: '/select',
      params: {
        name: 'articleType',
        fields: 'id,name',
        condition: `id=${pid}`
      }
    })
    .then(function (res) {
      if (!res.code) {
        setSelectedCategory(res.data[0])
      }
    })
  }

  useEffect(() => {
    const id = query.get('id')
    if (id) {
      queryNote(id)
    }
  },[])

  const handInMenu = () => {
    if (!query.get('id')) {
      return ;
    }
    const { id } = selectedCategory
    const { name, id: secondId } = selectedSecondMenu

    request({
      url: '/transaction',
      params: { 
        multipleTable: [
            {
              name:"articleInfo",
              fields:  {
                cate_id: secondId,
                isOnline: Number(isOnline),
                title: createTitle,
                content: encodeURIComponent(note)
              },
              condition: {
                id: noteId
              },
              dml: 'update'
            },
            {
              name:"articleCategory",
              fields:  {
                pid: id,
                name:name,
                cust_id: secondId.toString()
              },
              condition: {
                id: secondId
              },
              dml:'update'
            }
        ]
    }
    }).then(res => {
      let str = '更新失败'
      if (!res.code) {
        str = '更新成功'
      }
      alert(str)
    })
    
  }

  return (
    <div className="container left__menu">
      <nav className="level">
        <Select data={
          {
            category,
            setCategory,
            selectedCategory,
            setSelectedCategory,
            showDropDown,
            setShowDropDown,
            secondMenu, setSecondMenu,
            selectedSecondMenu,setSelectedSecondMenu,
            showSecondMenu,setShowSecondMenu,
            query
          }
        } />
        <SelectTwo data={
          {
            secondMenu,
            setSecondMenu,
            selectedSecondMenu,
            setSelectedSecondMenu,
            showSecondMenu,
            setShowSecondMenu,
            setCustomSecondMenu,
            query
          }
        } />
        <CreateInput data={
          {createTitle, setCreateTitle, query}
        } />
        <IsOnline data={
          {isOnline, setIsOnline, query}
        } />
      </nav>
      <Editor data={
        {setNote,note, query}
      } />
      <div className="notification is-success is-light">
        <div className="block">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={handInMenu} >更新笔记</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
