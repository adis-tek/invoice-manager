export default (invoices=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return invoices;
        default:
            return invoices;
    }
}