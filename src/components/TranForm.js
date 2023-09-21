import {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransContext } from '../hooks/useTransContext'

const TranForm = () => {
    const {dispatch} = useTransContext()
    const { user } = useAuthContext()

    const [desc,setDesc] = useState('')
    const [amount,setAmount] = useState('')
    const [category,setCat] = useState('')
    const [isIncome, setIsIncome] = useState(false)
    const [error , setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('you must be logged in')
            return
        }

        const tran = {desc, amount, category, isIncome}

        const response = await fetch('/trans',{
            method: 'POST',
            body: JSON.stringify(tran),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setDesc('')
            setAmount('')
            setCat('')
            setIsIncome(false)
            setError(null)
            setEmptyFields([])
            dispatch({type:'CREATE_TRAN',payload:json})
        }

    }



    return(
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a transaction</h3>

            <label>Description:</label>
            <input 
                type='text'
                onChange={(e)=>setDesc(e.target.value)}
                value={desc}
                className={emptyFields.includes('desc') ? 'error' : ''}
            />
            <label>Amount:</label>
            <input 
                type='number'
                onChange={(e)=>setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes('amount') ? 'error' : ''}

            />
            <label>category:</label>
            <input 
                type='text'
                onChange={(e)=>setCat(e.target.value)}
                value={category}
            />
            
            <label>income?</label>
            <input 
                type='checkbox'
                value={isIncome}
                onChange={()=>setIsIncome(!isIncome)}
            />
            
            <button>Add Transaction</button>
            {error && <div className='error'>{error}</div>}
        </form>

    )
}

export default TranForm