import React, { Component } from 'react';
import Item from './item';
import './index.less';

export default class ListRow extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="listRow-container">
                {children}
            </div>
        );
    }
}

ListRow.item = Item;
