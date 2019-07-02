// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import finalCreateStore from '@/store/configureStore';
// import reducer from '@/reducer/index';

// let store = finalCreateStore(reducer);
// import EntryApp from '@/containers/entry';
// import '../../assets/css/global.less';
// import '../../assets/css/reset_antd.less';
// import './index.less';
// import 'babel-polyfill';

// 语言包
// import { LocaleProvider } from 'antd';
// import zhCN from 'antd/lib/locale-provider/zh_CN';

// // fundebug
// import ErrorBoundary from '../fundebug';

// if (module.hot) {
//     module.hot.accept();
// }

// // 错误监控
// if (process.env.NODE_LOCATION === 'production') {
//     render(
//         <ErrorBoundary>
//             <Provider store={store}>
//                 <LocaleProvider locale={zhCN}>
//                     <EntryApp />
//                 </LocaleProvider>
//             </Provider>
//         </ErrorBoundary>,
//         document.getElementById('rms-content')
//     );
// } else {
//     render(
//         <Provider store={store}>
//             <LocaleProvider locale={zhCN}>
//                 <EntryApp />
//             </LocaleProvider>
//         </Provider>,
//         document.getElementById('rms-content')
//     );
// }

import dva from 'dva';
import React from 'react';
import { render } from 'react-dom';

import { createBrowserHistory } from 'history'
import '../../assets/css/global.less';
import '../../assets/css/reset_antd.less';
import './index.less';
import EntryApp from '@/containers/entry';
// 1. Initialize
const app = dva({
    history: createBrowserHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models').default);

// 4. Router
app.router(() => <EntryApp />);

// 5. Start

app.start('#rms-content');