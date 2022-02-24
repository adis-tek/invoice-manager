import * as api from '../pages/api/hello'

//ACTION CREATOR
export const getInvoices = () => async (dispatch: any, res: any) => {
    try {
        const { data } = await api.fetchInvoices();
        dispatch({ type: "FETCH_ALL", payload: data })
    } catch (error) {
        res.status(400).json();
        console.log(error);
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

export default getInvoices