const invoices = (invoices=["Something"], action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...invoices, action.payload];
        case "UPDATE":
            return invoices.map((invoice) => invoice.invoice_id === action.payload.invoice_id ? action.payload : invoice);
        case "DELETE":
            return invoices.filter((invoice) => invoice.invoice_id !== action.payload);
        default:
            return invoices;
    }
}

export default invoices