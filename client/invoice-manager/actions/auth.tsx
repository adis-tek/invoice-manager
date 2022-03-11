import * as api from '../api'

export const signup = (formData: any) => async (dispatch) => {
    try {
        console.log("Dispatched signup", formData);
    } catch (error) {
        console.log(error);
        
    }
}

export const signin = (formData: any) => async (dispatch) => {
    try {
        console.log("Dispatched signin", formData);
    } catch (error) {
        console.log(error);
        
    }
}