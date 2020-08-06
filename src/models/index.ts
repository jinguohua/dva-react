import userList from './rightmanage/right'

export default {
    namespace: 'rms',

    state: {
        ...userList.initialState
    },

    effects: {
        ...userList.effects
    },

    reducers: {
        ...userList.reducers
    }
};