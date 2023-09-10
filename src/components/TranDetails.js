import { useTransContext } from "../hooks/useTransContext"
import {formatDistanceToNow}  from 'date-fns'
import { useAuthContext } from "../hooks/useAuthContext"


const TranDetails = ({tran}) => {
    const {dispatch} = useTransContext()
    const { user } = useAuthContext()

    const handleClick = async() => {

        if(!user){
            return
        }
        const response = await fetch('https://budgetbackend-dhjq.onrender.com/trans/'+ tran._id, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_TRAN', payload: json})
        }
    }

    return(
        <div className="workout-details">
            <h4>{tran.desc}</h4>
            <p>{tran.amount} <strong>bhat</strong></p>
            <p>{tran.category}</p>
            <p>{formatDistanceToNow(new Date(tran.createdAt),{addSuffix:true})}</p>
            <span onClick={handleClick} className='material-symbols-outlined'>delete</span>
        </div>
    )
}

export default TranDetails