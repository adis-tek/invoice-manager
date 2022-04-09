const draft = (draft=[], action: any) => {
    switch (action.type) {
        case "FETCH_DRAFT":
            return action.payload;
        default:
            return draft;
    }
}

export default draft