// import { fetch } from './../../../assets/js/axios/axios'
import Request from './../../../assets/js/axios/request';
import Address from './../../../location';
import key from 'keymaster';

const initialState = {
    userList: {}
};

const effects = {
    *queryAccountList({ payload }: any, { call, put }: any) {
        let response = yield call(Request.postJson, Address.ajaxPath + '/account/list.html', payload);
        console.log(response, 'respose')
        if (response && response.result && response.result.length > 0) {
            response.result = response.result.map(item => Object.assign({}, item, { key: item.userId }))
        }
        yield put({
            type: 'updataUserList',
            payload: response
        })
    },
};

const reducers = {
    updataUserList(state, { payload }) {
        return {
            ...state,
            userList: payload
        }
    }
};

const subscriptions = {
    keyboardWatcher({ dispatch }) {
        key('⌘+\, ctrl+up', () => { dispatch({ type: 'queryAccountList' }) });
    }
}

export default { initialState, effects, reducers, subscriptions };