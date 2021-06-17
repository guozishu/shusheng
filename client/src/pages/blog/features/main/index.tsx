import React from 'react';
import {Home} from '../components/home/index'
import {Editor} from '../components/editor/index'

import './index.css'

export function Main(props) {
    const {note} = props.data

    React.useEffect(() => {

    }, [])

    return (
        <div className="content">
            {
                note? <Editor data={{note}} />: <Home />
            }
        </div>
    );
}
