import { combineReducers } from 'redux';
import { cartReducer } from 'stores/reducers/cartReducer';

const reducers = combineReducers({
    cart: cartReducer,
});

export { reducers };
