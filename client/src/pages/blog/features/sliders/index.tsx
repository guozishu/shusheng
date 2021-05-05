import React from 'react';
import { useDispatch } from 'react-redux';

import './Index.css'

export function Sliders() {
    const dispatch = useDispatch();
    return (
        <ul className="sidebar-links">
            <li>
                <section className="sidebar-group depth-0">
                    <p className="sidebar-heading open"> <span>Guide</span> </p>
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
            <li>
                <section className="sidebar-group depth-0">
                    <p className="sidebar-heading"><span>Set up OAuth App</span> </p>
                    <ul className="sidebar-links sidebar-group-items">
                        <li><a href="#" className="sidebar-link">GitHub OAuth App</a></li>
                        <li><a href="#" className="sidebar-link">GitLab Application</a></li>
                        <li><a href="#" className="sidebar-link">BitBucket OAuth Consumer</a></li>
                        <li><a href="#" className="sidebar-link">Gitee Third Party Application</a></li>
                        <li><a href="#" className="sidebar-link">Gitea Application</a></li>
                    </ul>
                </section>
            </li>
            <li>
                <section className="sidebar-group depth-0">
                    <p className="sidebar-heading"><span>Static Site Tools</span> </p>
                    <ul className="sidebar-links sidebar-group-items">
                        <li><a href="#" className="sidebar-link">VuePress</a></li>
                        <li><a href="#" className="sidebar-link">Nuxt</a></li>
                        <li><a href="#" className="sidebar-link">Gridsome</a></li>
                    </ul>
                </section>
            </li>
        </ul>
    );
}
