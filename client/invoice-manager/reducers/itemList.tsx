const itemList = (itemList=[], action: any) => {
    switch (action.type) {
        case "FETCH_ALL_ITEMLIST":
            return action.payload;
        default:
            return itemList;
    }
}

export default itemList