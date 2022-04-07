const authReducer = (authReducer = [], action: any) => {
    switch (action.type) {
        case 'AUTH':
            // localStorage.setItem('profile', JSON.stringify({...action.data}))

            console.log("What's data?", action.payload);

            return action.payload;
        case 'LOGOUT':
            // localStorage.clear();

            return null;

        default:
            return authReducer;
    }
}

export default authReducer