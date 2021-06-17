import React from 'react';
import './index.css'

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
