const billInfo = (billInfo=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL_BILLINFO":
            return action.payload;
        default:
            return billInfo;
    }
}

export default billInfo