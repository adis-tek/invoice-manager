const billTo = (billTo=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL_BILLTO":
            return action.payload;
        default:
            return billTo;
    }
}

export default billTo