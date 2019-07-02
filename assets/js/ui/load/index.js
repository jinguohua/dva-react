import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

let loadDiv = null;

// 卸载组件
const closeMountComponentAtNode = (ele) => {
    ele ? ReactDOM.unmountComponentAtNode(ele) : null;
    if (ele && ele.parentNode) {
        ele.parentNode.removeChild(ele);
    }
};

// 去除组件
export function loadEnd() {
    const $load = document.querySelector('.ui-loading');
    if ($load) {
        $load.classList.remove('ui-loading-show');
        $load.addEventListener('transitionend', null);
        $load.addEventListener('transitionend', () => {
            closeMountComponentAtNode(loadDiv);
        }, false);
    }
}

// loadStart
export function loadStart() {
    let $uiLoading = document.getElementById('loading-component');
    if (!$uiLoading || $uiLoading.length <= 0) {
        loadDiv = document.createElement('div');
        loadDiv.id = 'loading-component';
        document.body.appendChild(loadDiv);
        let root = React.createElement(
            'div',
            { className: 'ui-loading ui-loading-show' },
            React.createElement(
                'div',
                { className: 'indicator' }
            )
        );
        ReactDOM.render(root, loadDiv);
    }
}
