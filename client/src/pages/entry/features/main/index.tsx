import React from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import './Index.css'

export function Main(props) {
    const Child = props.children
    return (
        <div className="content">
            {
                props.children
            }
        </div>
    );
}
