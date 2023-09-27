import { useTransContext } from "../hooks/useTransContext"
import {formatDistanceToNow}  from 'date-fns'
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"


const TranDetails = ({tran}) => {
    const {dispatch} = useTransContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = async(event) => {
        event.stopPropagation();
        if(!user){
            return
        }
        const response = await fetch('/trans/'+ tran._id, {
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
    const handleEdit = async () => {
        if(!user){
            return
        }
        const response = await fetch('/trans/'+ tran._id, {
            method:'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'GET_TRAN', payload: json})
            navigate('/edit')
        }
    }

    return(
        <div className="tran-details">
            <h4>{tran.desc}</h4>
            {tran.isIncome? <p className="income"><b>Income</b></p> : <p className="expense"><b>Expense</b></p>}
            <p>{tran.amount} <strong>bhat</strong></p>
            <p>{tran.category}</p>
            <p>{formatDistanceToNow(new Date(tran.createdAt),{addSuffix:true})}</p>
            <span onClick={handleEdit} className='material-symbols-outlined edit'>edit</span>
            <span onClick={handleClick} className='material-symbols-outlined delete'>delete</span>
        </div>
    )
}

export default TranDetails