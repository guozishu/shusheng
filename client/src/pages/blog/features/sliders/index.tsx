import React, { useEffect, useState } from 'react';
import { getUrlStrArgs } from '../../../../common/utils/index'
import './index.css'

export function Sliders(props) {
    const {setNote} = props.data
    const [cateMenus, setCateMenus] = useState({});
    const [title,setTitle] = useState({id:0,name:''});
    const [selectedList,setSelectedList] = useState<any>([]);

    useEffect(() => {
        let params: string[] = getUrlStrArgs(1);
        if (params && !params[0]) {
            params = ['1']
        }
        querySecondMenu(Number(params[0]));
        queryTitle(Number(params[0]))
    }, [])

    const request = function (params) {
        return fetch(params.url, {
            body: JSON.stringify(params.params),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }

    const queryTitle = id => {
        request({
            url: '/select',
            params: {
              name: 'articleType',
              fields: 'id,name',
              condition: `id=${id}`
            }
          }).then(function (res) {
            if (!res.code) {
                setTitle(res.data[0])
            }
          })
    }

    const querySecondMenu = id => {
        const params = {
            name: 'pzhkux2wxwl',
            fields: '61twbqeeaot',
            condition: 'fx51cohv0om',
            supplement: id,
            mappingProperty: 'querySecondMenu'
        }
        request({
            url: '/queryData',
            params
        }).then(function (res) {
            if (!res.code) {
                let cateObj = {}
                res.data.forEach((item, index) => {
                    const {noteId, name} = item
                    if (!index) {
                        setSelectedList([name,noteId])
                    }
                    if (!cateObj[name]) {
                        cateObj[name] = [];
                    }
                    cateObj[name].push(item) 
                })
                setCateMenus(cateObj)
            }
        })
    }

    const setSelectedNote = args => {
        setSelectedList(args)
        request({
            url: '/select',
            params: {
              name: 'articleInfo',
              fields: 'content',
              condition: `id=${args[1]}`
            }
          }).then(function (res) {
            if (!res.code) {
                setNote(decodeURIComponent(res.data[0].content))
            }
          })
    }

    return (
        <ul className="sidebar-links">
            <li>
                <section className="sidebar-group depth-0">
                    <p className="sidebar-heading open"> <span>{title && title.name}</span> </p>
                    <ul className="sidebar-links sidebar-group-items">
                        {
                            Object.keys(cateMenus).map((item, index) => {
                                const cateMatch = selectedList.includes(item)
                                return <React.Fragment key={index}>
                                    <li>
                                        <a onClick={() => setSelectedNote([item,cateMenus[item][0].noteId])} className={`${cateMatch?'active':''} sidebar-link`}>{item}</a>
                                        <ul className={`${!cateMatch?'is-hidden':''} sidebar-sub-headers`}>
                                            {
                                                cateMenus[item].map(value => {
                                                const {noteId, title} = value
                                                   return <li key={noteId} className= {`sidebar-sub-header`}>
                                                        <a onClick={() => setSelectedNote([item,noteId])} className={`${selectedList.includes(noteId)?'active':''} sidebar-link`}>{title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </li>
                                </React.Fragment>
                            })
                        }
                     </ul>
                </section>
            </li>
        </ul>
    );
}
