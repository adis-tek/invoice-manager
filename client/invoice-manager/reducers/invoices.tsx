const invoices = (invoices=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...invoices, action.payload];
        default:
            return invoices;
    }
}

export default invoices