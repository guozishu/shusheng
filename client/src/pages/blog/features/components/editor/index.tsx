import React from 'react';
import EditNote from 'for-editor';
import './index.css'

export function Editor(props) {
    const {note} = props.data;

    return (
        <div className="editor-content">
           
           <div className="editor-board">
              <EditNote
                preview='true'
                toolbar={
                  {}
                }
                style={{ border: 'none', boxShadow: 'none' }}
                height='100%'
                value={ decodeURIComponent(note || '') }
              />
            </div>
        </div>
    );
}
