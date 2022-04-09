const paid = (paid=[], action: any) => {
    switch (action.type) {
        case "FETCH_PAID":
            return action.payload;
        default:
            return paid;
    }
}

export default paid