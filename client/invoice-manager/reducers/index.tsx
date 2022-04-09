import { combineReducers } from 'redux';
import billFrom from "./billFrom"
import billTo from "./billTo"
import billInfo from "./billInfo"
import itemList from "./itemList"
import invoices from './invoices';
import draft from './draft';
import pending from './pending';
import paid from './paid';
import auth from './auth';


export default combineReducers({
    auth,
    billFrom,
    billTo,
    billInfo,
    itemList,
    invoices,
    draft,
    pending,
    paid,
})