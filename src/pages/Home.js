import { useEffect, useState } from "react"
import Card from "../components/Card"
import TranForm from "../components/TranForm"
import { dayLoop } from "../helpers"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTransContext } from "../hooks/useTransContext"

const Home = () => {
    const [daysDisplayed , setDaysDisplayed] = useState([])
    const {trans , dispatch} = useTransContext()
    const { user } = useAuthContext()


    useEffect(()=>{
        const fetchTrans = async () => {
            const response = await fetch('https://budgetbackend-dhjq.onrender.com/trans',{
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            if(response.ok){dispatch({type:'SET_TRANS',payload:json})}
        }
        if(user){ 
            fetchTrans() 
            dayLoop(setDaysDisplayed)
        }
    },[dispatch,user])

    
    
    return(
        <div className="home">
            <div className="workouts" >
                {trans && daysDisplayed.map(day => (
                    <Card trans={trans} day={day} title={day} key={day} />
                ))}
            </div>
            <TranForm />
        </div>
    )
}

export default Home