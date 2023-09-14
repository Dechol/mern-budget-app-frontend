import { useAuthContext } from "./useAuthContext"
import {useState } from 'react'


const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setLoading(true)
        setError(null)

        const response = await fetch('https://budgetbackend-dhjq.onrender.com/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
    
        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //update auth context
            dispatch({type:'LOGIN' ,payload: json})
            setLoading(false)
        }
    }

    return { login, isLoading, error}    
}

export default useLogin