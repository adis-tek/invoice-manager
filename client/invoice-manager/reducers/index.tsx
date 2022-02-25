import { combineReducers } from 'redux';
import billFrom from "./billFrom"
import billTo from "./billTo"
import billInfo from "./billInfo"
import itemList from "./itemList"
import invoices from './invoices';

export default combineReducers({
    billFrom,
    billTo,
    billInfo,
    itemList,
    invoices,
})