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

export const createInvoice = (invoice: any) => async (dispatch: any) => {
    try {
        const { data } = await api.createInvoice(invoice);

        dispatch({ type: "CREATE", payload: data })
    } catch (error) {
        console.log(error);
    }
}