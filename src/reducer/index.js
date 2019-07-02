import { combineReducers } from 'redux';                // 合并reducer集合
import { routerReducer } from 'react-router-redux';     // 将routerReducer一起合并管理

import { Public } from '@/reducer/public/reducer';

export default combineReducers({
    Public,
    routing: routerReducer,
});
