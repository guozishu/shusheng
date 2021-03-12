import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    showName,
    hideName,
    hideAsync,
    userName,
    isNameShow,
    changeName
} from './userNameSlice';
import {
  fetchUserById
} from './userApi';
import  './userName.module.css';

export function UserName() {
  const dispatch = useDispatch();
  const isShow = useSelector(isNameShow);
  // const name = useSelector(userName);
  const [name,setName] = useState('wanglong');

  React.useEffect(() => {
    dispatch(fetchUserById('sdf'))
  }, [dispatch])

  return (
    <div>
      <div className={`show_name`}>
        <input value={isShow?name:''} type="text" onChange={e=>{
            setName(e.target.value)
        }} />
        <button onClick={() =>
            dispatch(showName(true))
          }>show</button>
        <button onClick={() =>
            dispatch(hideName(false))
          }>hide</button>
        <button onClick={() =>
            dispatch(hideAsync(false))
          }>hideAsync</button>
      </div>
    </div>
  );
}
