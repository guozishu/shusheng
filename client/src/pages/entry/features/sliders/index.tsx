import React from 'react';
import { useDispatch } from 'react-redux';
import './Index.css'

export function Sliders(props) {
    const dispatch = useDispatch();
    const Child = props.component
    return (
        <ul className="sidebar-links">
            <li>
                <section className="sidebar-group depth-0">
                    <ul className="sidebar-links sidebar-group-items">
                        <Child />
                        <li> 
                            <a href="#" className="active sidebar-link">编辑顶部菜单</a>
                        </li>
                    </ul>
                </section>
            </li>
        </ul>

    );
}


