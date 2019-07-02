import React from 'react';
import './index.less';

export default function Error({ title }) {
    return (
        <div className="error-component">
            <h3>{title || '404'}</h3>
            <p>访问连接无效，如有疑问请联系管理员</p>
        </div>
    );
}
