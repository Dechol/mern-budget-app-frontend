import { TranContext } from "../context/TranContext"
import {useContext} from 'react'

export const useTransContext = () => {
    const context = useContext(TranContext)

    if(!context){
        throw Error('useTranContext must be used inside the provider')
    }

    return context
}