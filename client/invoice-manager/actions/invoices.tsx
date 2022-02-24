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

export default getInvoices