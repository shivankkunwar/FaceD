import { CHANGE_USER_FIELD } from "./constants"

export const setUser =(data)=>({
    type:CHANGE_USER_FIELD,
    payload: data
})