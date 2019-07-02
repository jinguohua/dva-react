import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './index.less';

export default class PBreadcrumb extends Component {
    render() {
        const { list } = this.props;
        return (
            <div>
                {list && list.length > 0 ? (
                    <Breadcrumb>
                        {
                            list.map((item) => {
                                return (
                                    <Breadcrumb.Item key={item.name}>
                                        {item.link ? (
                                            <Link to={item.link}>{item.name}</Link>
                                        ) : (
                                            <span>{item.name}</span>
                                        )}
                                    </Breadcrumb.Item>
                                );
                            })
                        }
                    </Breadcrumb>
                ) : null}
            </div>
        );
    }
}
