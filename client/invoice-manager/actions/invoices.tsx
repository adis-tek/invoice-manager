import * as api from '../pages/api/hello'

//ACTION CREATOR
export const getInvoices = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchInvoices()
        dispatch({ type: "FETCH_ALL", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}

export const getBillFrom = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchBillFrom()
        dispatch({ type: "FETCH_ALL_BILLFROM", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}

export const getBillTo = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchBillTo()
        dispatch({ type: "FETCH_ALL_BILLTO", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}

export const getBillInfo = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchBillInfo()
        dispatch({ type: "FETCH_ALL_BILLINFO", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}

export const getItemList = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchItemList()
        dispatch({ type: "FETCH_ALL_ITEMLIST", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}

// export const createInvoice = (invoice: any) => async (dispatch: any) => {
//     try {
//         const { data } = await api.createInvoice(invoice);

//         dispatch({ type: "CREATE", payload: data })
//     } catch (error) {
//         console.log(error);
//     }
// }  