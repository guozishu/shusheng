import React, { useEffect } from 'react';
import './index.css';
import Editor from 'for-editor';

export default function Index(props) {
  const {note,setNote,query} = props.data

  return <section className="section">
  <h1 className="title">笔记内容</h1>
    <Editor
      preview={true}
      subfield={true}
      height='600px'
      value={note}
      onChange={value => setNote(value)}
    />
</section>
}
