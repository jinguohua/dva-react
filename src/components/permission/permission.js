import React from 'react';
import './permission.less';

// permission 是否为403没有权限访问
// title 模块名称
// errorMessage 加载失败错误提示
export const Permission = ({ isPermission, title, errorMessage }) => {
    return (
        <div>
            {isPermission ? (
                <div className="permission-component">
                    <h3>您没有权限访问 - {title || '此模块'}</h3>
                    <p>如果您已开启权限仍不能访问，请联系 "管理员"<br/> 如果您需要开启此应用程序权限功能请联系您的 "直属主管"</p>
                </div>
            ) : (
                <div>
                    {errorMessage ? (
                        <div className="error-component">
                            <h3 className="error-component-title">{errorMessage}</h3>
                            <p className="error-component-message">请刷新页面或者联系管理员</p>
                        </div>
                    ) : (
                        <div className="load-component">
                            <div className="load-component-rotate">&nbsp;</div>
                            <h3 className="load-component-text">努力加载中...</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
