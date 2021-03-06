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

export const getDraft = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchdraft()
        dispatch({ type: "FETCH_DRAFT", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}

export const getPending = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchPending()
        dispatch({ type: "FETCH_PENDING", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}

export const getPaid = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchPaid()
        dispatch({ type: "FETCH_PAID", payload: data })
    } catch (err) {
        console.log((err as Error).message);
    }
}
 
export const createInvoice = (invoice: any) => async (dispatch: any) => {
     try {
         const { data } = await api.createInvoice(invoice);

         dispatch({ type: "CREATE", payload: data })
     } catch (error) {
         console.log(error);
     }
}  

export const updateInvoice = (updatedInvoice: any, id: any) => async (dispatch: any) => {
    try {
        const { data } = await api.updateInvoice(updatedInvoice, id);

        dispatch({ type: "UPDATE", payload: data })
    } catch (error) {
        console.log(error);
    }
} 

export const deleteInvoice = (id: any) => async (dispatch: any) => {
    try {
        await api.deleteInvoice(id);

        dispatch({ type: "DELETE", payload: id })
    } catch (error) {
        console.log(error);
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