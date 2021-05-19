import React from 'react';
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
