import { useEffect } from "react"

import TranDetails from '../components/TranDetails'
import TranForm from "../components/TranForm"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTransContext } from "../hooks/useTransContext"


const Home = () => {
    const {trans , dispatch} = useTransContext()
    const { user } = useAuthContext()

    useEffect(()=>{
        const fetchTrans = async () => {
            const response = await fetch('/trans',{
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            console.log(json)

            if(response.ok){
                dispatch({type:'SET_TRANS',payload:json})
            }
        }
        if(user){
            fetchTrans()
        }

    },[dispatch,user])

    return(
        <div className="home">
            <div className="workouts" >
                {trans && trans.map((tran)=>(
                    <TranDetails key={tran._id} tran={tran} />
                ))}
            </div>
            <TranForm />
        </div>
    )
}

export default Home