import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUrlStrArgs } from '../../../../common/utils/index'
import './Index.css'

export function Sliders() {
    const [cateMenus, setCateMenus] = useState({});
    const [title,setTitle] = useState({id:0,name:''});

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
                res.data.forEach(item => {
                    const {noteId, name, title} = item
                    if (!cateObj[name]) {
                        cateObj[name] = [];
                    }
                    cateObj[name].push(item) 
                })
                setCateMenus(cateObj)
                console.log(cateObj)
            }
        })
    }

    return (
        <ul className="sidebar-links">
            <li>
                <section className="sidebar-group depth-0">
                    <p className="sidebar-heading open"> <span>{title.name}</span> </p>
                    <ul className="sidebar-links sidebar-group-items">
                        {
                            Object.keys(cateMenus).map((item, index) => {
                                return <React.Fragment key={index}>
                                    <li>
                                        <a href="#" className="sidebar-link">{item}</a>
                                        <ul className="sidebar-sub-headers">
                                            {
                                                cateMenus[item].map(value => {
                                                    const {noteId, title} = value
                                                   return <li key={noteId} className="sidebar-sub-header">
                                                        <a href="#" className="sidebar-link">{title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </li>
                                </React.Fragment>
                            })
                        }
                     </ul>
                    <ul className="sidebar-links sidebar-group-items">
                        <li>
                            <a href="#" className="active sidebar-link">Introduction</a>
                            <ul className="sidebar-sub-headers">
                                <li className="sidebar-sub-header">
                                    <a href="#" className="active sidebar-link">How Vssue works</a>
                                </li>
                                <li className="sidebar-sub-header">
                                    <a href="#" className="sidebar-link">Comparison with similar projects</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="sidebar-link">Getting Started</a>
                        </li>
                        <li>
                            <a href="#" className="sidebar-link">Supported Platforms</a>
                        </li>
                        <li>
                            <a href="#" className="sidebar-link">Custom Styles</a>
                        </li>
                        <li>
                            <a href="#" className="sidebar-link">Developer Guide</a>
                        </li>
                    </ul>
                </section>
            </li>
        </ul>
    );
}
