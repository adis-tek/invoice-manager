const invoices = (invoices=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...invoices, action.payload];
        case "UPDATE":
            return invoices.map(invoice => invoice.id === action.payload.id ? action.payload : invoice);
        case "DELETE":
            return invoices.filter((invoice) => invoice.id !== action.payload);
        default:
            return invoices;
    }
}

export default invoices