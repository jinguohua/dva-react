import React, { useState } from 'react';
import { Menu, message } from 'antd';
import { aLink, random } from '../../../../assets/js/util/util';
import Address from '../../../../location';
import { dispatchLoginOut } from '../action/action';
import './header.less';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function Header(props) {
    const [personMenus] = useState([]);
    const [userName] = useState(localStorage.getItem('userName'));

    function loginOut() {
        dispatchLoginOut({}, function (res) {
            if (res.code !== 200) {
                message.warn(res.message || '服务系统异常', 1.2);
            } else {
                location.href = `${Address.path}${Address.originPath}/login.html`;
            }
        });
    };

    return (
        <div className="navbar" >
            <img
                className="navbar-logo-leaf disInlineBlock"
                src="http://static.caibeike.com/i/8259cb48c22bbdacf684a287e7496257-Rzwy2T" />

            <div
                className="navbar-logo-text disInlineBlock"
            // onClick={() => location.href = Address.path + Address.originPath + "/index.html"}
            >
                &nbsp;&nbsp; 彩贝壳后台管理中心
            </div>
            <Menu className="disInlineBlock fr"
                mode="horizontal" >
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper" >
                            <img className="navbar-logo-user"
                                src="https://static.caibeike.com/i/0fe8d64e416974d3e128e84d50f18529-jAXuIG" />
                            <span className="navbar-logo-title" > {userName}, 欢迎您 </span>
                        </span>}>
                    <MenuItemGroup>
                        {
                            personMenus.map((item: any) => {
                                return (
                                    <Menu.Item key={random()} onClick={() => {
                                        aLink(item.url);
                                    }
                                    }> {item.title} </Menu.Item>
                                );
                            })
                        }
                        <Menu.Item onClick={loginOut}> 退出 </Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        </div>
    )
}