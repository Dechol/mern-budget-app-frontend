import { useTransContext } from "./useTransContext"

const { useAuthContext } = require("./useAuthContext")


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const {dispatch: transDispatch} = useTransContext()

    const logout = () => {
        //remove user from local stoarge
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        transDispatch({type:'SET_TRANS', payload: null})
    }

    return { logout }
}

