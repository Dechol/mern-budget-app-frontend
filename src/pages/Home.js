import { useEffect } from "react"
import Card from "../components/Card"
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

            if(response.ok){dispatch({type:'SET_TRANS',payload:json})}
        }
        
        if(user){ fetchTrans() }
    },[dispatch,user])

    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const daybefore = new Date(Date.now() - 86400000*2).toDateString()
    console.log('test merge')

    return(
        <div className="home">
            <div className="workouts" >
                {trans && <Card trans={trans} day={today} title={'Today'} />}
                {trans && <Card trans={trans} day={yesterday} title={'Yesterday'} />}
                {trans && <Card trans={trans} day={daybefore} title={'Daybefore'} />}
            </div>
            <TranForm />
        </div>
    )
}

export default Home