import React from 'react';
import { useDispatch } from 'react-redux';
import Editor from '@cuiko/for-editor'
import {Home} from '../components/home/index'

import './Index.css'

export function Main() {
    const [value,setValue] = React.useState("## JavaScript中的数组是一种有序的数据结构")

    React.useEffect(() => {

    }, [])

    return (
        <div className="content">
            <Home />
        </div>
    );
}
