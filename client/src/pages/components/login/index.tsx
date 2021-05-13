import React, { useEffect, useState } from 'react';
import './index.css'

export function usePortal(props) {

    const [isShow, setIsSow] = useState(false);

    useEffect(() => {

    }, [props])

    return (
        <div className="content">
            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className='pure-form pure-form-aligned'>
                        <fieldset>
                            <div className='pure-control-group'>
                                <label htmlFor='name'>用户:</label>
                                <input id='name' type='text' placeholder='请输入用户名' />
                            </div>

                            <div className='pure-control-group'>
                                <label htmlFor='password'>密码:</label>
                                <input id='password' type='password' placeholder='别忘记密码' />
                            </div>
                            <div className='pure-controls'>
                                <button type='submit' className='pure-button pure-button-primary'>登陆</button>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    );
}
