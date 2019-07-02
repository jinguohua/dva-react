import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import { menu } from './config'

let rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
const SubMenu = Menu.SubMenu;

const SiderBar = (props) => {
    const [collapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [selectedKeys, setSelectedKeys] = useState(['1']);

    const onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(openKeys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    };

    const onSelectedChange = (key) => {
        setSelectedKeys([key + ''])
    };

    useEffect(() => {
        menu.map(item => {
            if (item.children) {
                for (let i = 0; i < item.children.length; i++) {
                    let cItem = item.children[i];
                    if (cItem.link === props.location.pathname) {
                        setSelectedKeys([cItem.key])
                        return
                    }
                }

            }
        })
    }, [props])

    return (
        <div className="nav-container">
            <div>
                <div style={{ width: 188 }}>
                    <Menu
                        openKeys={openKeys}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={selectedKeys}
                        onOpenChange={onOpenChange}
                        mode="inline"
                        inlineCollapsed={collapsed}
                    >
                        {
                            menu.map((item, index) => {
                                return (
                                    <SubMenu key={item.key}
                                        title={
                                            <span
                                                style={{ userSelect: 'none' }}
                                            >
                                                <Icon type={item.Icon} />
                                                <span>{item.title}</span>
                                            </span>}>
                                        {
                                            item.children.map((children, childrenIndex) => {
                                                return (
                                                    <Menu.Item key={children.key}
                                                        style={{ userSelect: 'none' }}
                                                        onClick={() => onSelectedChange(children.key)}>
                                                        <Link to={children.link}>
                                                            {children.title}
                                                        </Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </div>
            </div>
        </div>
    )
};

export default withRouter(SiderBar);
