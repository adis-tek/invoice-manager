const pending = (pending=[], action: any) => {
    switch (action.type) {
        case "FETCH_PENDING":
            return action.payload;
        default:
            return pending;
    }
}

export default pending