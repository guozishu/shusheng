import React, { useState } from 'react';
import './index.css';
import Editor from './components/editor/index';
import Select from './components/select/index';
import SelectTwo from './components/selectTwo/index';
import CreateInput from './components/createInput/index';
import IsOnline from './components/isOnline/index';


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
  const [showSecondMenu,setShowSecondMenu] = useState('')

  const [customSecondMenu,setCustomSecondMenu] = useState<Category>({id:-1,name:''});

  const [note,setNote] = React.useState("## 新建笔记")

  const [isOnline, setIsOnline] = useState(false);

  const [createTitle, setCreateTitle] = useState('');

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
    const { id } = selectedCategory
    const { name, id: secondId } = selectedSecondMenu
    const cate_Id = Date.now().toString()
    const { id: customId } = customSecondMenu
    const multipleTable = [
      {
        name: "articleInfo",
        fields: {
          cate_id: customId > 0? customId: secondId,
          isOnline: Number(isOnline),
          title: createTitle,
          content: encodeURIComponent(note),
          createTime: Date.now().toString()
        }
      }
    ]

    const categoryTable: any = {
      name: "articleCategory",
      fields: {
        pid: id,
        name: name,
        cust_id: customId
      }
    }

    if (customId > 0) {
      multipleTable.push(categoryTable)
    }

    request({
      url: '/transaction',
      params: {
        multipleTable
      }
    }, function (res) {

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
            setCustomSecondMenu
          }
        } />
        <CreateInput data={
          {createTitle, setCreateTitle}
        } />
        <IsOnline data={
          {isOnline, setIsOnline}
        } />
      </nav>
      <Editor data={
        {setNote,note}
      } />
      <div className="notification is-success is-light">
        <div className="block">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={handInMenu} >新增</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
