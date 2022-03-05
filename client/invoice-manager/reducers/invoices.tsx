const invoices = (invoices=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...invoices, action.payload];
        case "UPDATE":
            return action.payload;
        case "DELETE":
            return [...invoices, invoices.filter((invoice) => invoice.id !== action.payload)];
        default:
            return invoices;
    }
}

export default invoices