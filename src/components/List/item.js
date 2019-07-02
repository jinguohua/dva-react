import React, { Component } from 'react';

export default class ListItem extends Component {
    render() {
        let { title } = this.props;
        return (
            <div className="listRow-item">
                <div className="listRow-item-title">{title}：</div>
                <div className="listRow-item-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
