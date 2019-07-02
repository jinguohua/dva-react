import { USERNAME } from '@/action/public/type';

const declareInitial = {
    userName: ''
};

export function Public(state = declareInitial, action) {
    switch (action.type) {
        case USERNAME:
            return Object.assign({}, state, { userName: action.json });
        default:
            return state;
    }
}
