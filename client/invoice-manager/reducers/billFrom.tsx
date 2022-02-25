const billFrom = (billFrom=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL_BILLFROM":
            return action.payload;
        default:
            return billFrom;
    }
}

export default billFrom