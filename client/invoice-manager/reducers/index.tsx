import { combineReducers } from 'redux';
import billFrom from "./billFrom"
import billTo from "./billTo"
import billInfo from "./billInfo"
import itemList from "./itemList"
import invoices from './invoices';
import auth from './auth';

export default combineReducers({
    auth,
    billFrom,
    billTo,
    billInfo,
    itemList,
    invoices,
})