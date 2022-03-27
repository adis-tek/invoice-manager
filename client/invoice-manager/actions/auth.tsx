import * as api from '../pages/api/hello'

export const signin = (formData: any) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);

        dispatch({ type: "AUTH", data })

        console.log("Dispatched signin", formData);
    } catch (error) {
        console.log(error);
        
    }
} 

export const signup = (formData: any) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);

        dispatch({ type: "AUTH", data })

        console.log("Dispatched signup", formData);
    } catch (error) {
        console.log(error);
        
    }
}