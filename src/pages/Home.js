import { useEffect, useState } from "react"
import Card from "../components/Card"
import { dayLoop } from "../helpers"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTransContext } from "../hooks/useTransContext"

const Home = () => {
    const [weeks, setWeeks] = useState(1)
    const [daysDisplayed , setDaysDisplayed] = useState([])
    const {trans , dispatch: transDispatch} = useTransContext()
    const { user, dispatch } = useAuthContext()

    useEffect(()=>{
        const fetchTrans = async () => {
            const response = await fetch('https://budgetbackend-dhjq.onrender.com/trans',{
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            if(!response.ok){
                // sign user out & DISPLAY ERROR MESSAGE?
                console.log('json: ',json.error)
                localStorage.removeItem('user')
                dispatch({type:'LOGOUT'})
                transDispatch({type:'SET_TRANS', payload: null})            
            }
            if(response.ok){
                console.log('response ok')
                transDispatch({type:'SET_TRANS',payload:json})
            }
        }
        if(user){ 
            console.log('user is logged in')
            dayLoop(setDaysDisplayed, weeks)
            fetchTrans() 
        }
    },[ transDispatch, user, weeks, dispatch ])

    const loadMore = () => {
        setWeeks(weeks + 1)
    }

    return(
        <div className="home">
            <div className="workouts" >
                {trans && daysDisplayed.map(day => (
                    <Card trans={trans} day={day} title={day} key={day} />
                ))}
                {trans && <button className="loadmore" onClick={loadMore}>Load more</button>}
            </div>
        </div>
    )
}

export default Home