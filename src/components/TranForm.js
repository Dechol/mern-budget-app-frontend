import {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransContext } from '../hooks/useTransContext'


const todayDate = new Date().toISOString().split('T')[0]

const TranForm = () => {
    const [desc,setDesc] = useState('')
    const [amount,setAmount] = useState('')
    const [category,setCat] = useState('')
    const [isIncome, setIsIncome] = useState(false)
    const [date, setDate] = useState(todayDate)
    const [isRecurring, setIsRecurring] = useState('false')
    const [isHighlight, setIsHighlight] = useState(false)

    const [error , setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {dispatch} = useTransContext()
    const { user } = useAuthContext()

    


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('you must be logged in')
            return
        }

        const tran = {desc, amount, category, isIncome, date, isRecurring, isHighlight}
        console.log(tran)

        const response = await fetch('https://budgetbackend-dhjq.onrender.com/trans',{
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
            setDate(todayDate)
            setIsRecurring('false')
            setIsHighlight(false)

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

            <div className='radio'>
                <input 
                    type='radio'
                    name='isIncomeRadio'
                    value={isIncome}
                    onChange={()=>setIsIncome(true)}
                />
                <label >Income</label>
            </div>
            <div className='radio'>
                <input 
                    type='radio'
                    name='isIncomeRadio'
                    value={isIncome}
                    onChange={()=>setIsIncome(false)}
                />
                <label >Expense</label>
            </div>            

            <label>Date:</label>
            <input 
                type='date'
                onChange={(e)=>setDate(e.target.value)}
                value={date}
            />

            <select name={isRecurring} onChange={(e)=> setIsRecurring(e.target.value)} disabled>
                <option value='false'>One Off Transaction</option>
                <option value='true'>Recurring Transaction</option>
            </select>

            <div className='checkbox'>
                <input 
                    type='checkbox' 
                    value={isHighlight} 
                    onChange={(e) => setIsHighlight(e.target.checked)} 
                    disabled
                />
                <label className='checkbox'>Highlight</label>
            </div>
            <br />
            
            <button>Add Transaction</button>
            {error && <div className='error'>{error}</div>}
        </form>

    )
}

export default TranForm