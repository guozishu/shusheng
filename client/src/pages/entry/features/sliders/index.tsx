import React from 'react';
import { useDispatch } from 'react-redux';
import './index.css'

export function Sliders(props) {
    const dispatch = useDispatch();
    const Child = props.component
    return (
        <ul className="sidebar-links">
            <li>
                <section className="sidebar-group depth-0">
                    <ul className="sidebar-links sidebar-group-items">
                        <Child />
                    </ul>
                </section>
            </li>
        </ul>

    );
}


