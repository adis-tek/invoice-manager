const initialState = {
    invoices: [],
    loading: true,
    length: null,
};

const invoices = (state = initialState, action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return {
                ...state,
                invoices: action.payload,
                loading: false,
                length: state.invoices.length,
            };
        case "CREATE":
            return {
                ...state,
                invoices: action.payload,
                loading: false,
            };
        case "UPDATE":
            return {
                ...state,
                invoices: action.payload,
                loading: false,
            };
        case "DELETE":
            return {
                ...state,
                invoices: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default invoices