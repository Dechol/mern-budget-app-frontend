import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTransContext } from "../hooks/useTransContext"
import { useLogout } from '../hooks/useLogout'


//CREATE PAGE (COMPONENT)FOR TRANSACTION TO EDIT --complete
//GET TRAN(ID) FROM CONTEXT OR DB --from context 
//MADE CHANGES TO THE TRAN AND SUBMIT --name, amount cat
//PATCH EDITED TRAN TO DB 
//LOAD HOMESCREEN AND SET NEW CONTEXT


const Edit = () => {
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCat] = useState('')
    const [date, setDate] = useState('')
    const [isIncome, setIsIncome] = useState(false)
    const [isRecurring, setIsRecurring] = useState(false)
    const [isHighlight, setIsHighLight] = useState(false)

    const [error, setError] = useState(null)
    const {trans } = useTransContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const {logout} = useLogout()

    console.log('edit tran:',trans)
    useEffect(()=>{
        const setTran = () => {
            setDesc(trans[0].desc)
            setAmount(trans[0].amount)
            setCat(trans[0].category)
            setIsIncome(trans[0].isIncome)
            setDate((trans[0].date? trans[0].date : trans[0].createdAt).split('T')[0])
            setIsRecurring(trans[0].setIsRecurring)
            setIsHighLight(trans[0].isHighlight)
        }
        console.log(trans.length)
        if(trans && trans.length === 1){
            setTran()
        }
    },[trans])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(desc, amount, category, date, isIncome, isHighlight)

        if(!user){
            setError('you must be logged in')
            return
        }

        const tran = {desc, amount, category, date}

        const response = await fetch(process.env.REACT_APP_URL +'trans/'+ trans[0]._id ,{
            method: 'PATCH',
            mode:'cors',
            body: JSON.stringify(tran),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }            
        })
        const json = await response.json()

        if(response.status === 401 ){logout()}
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            console.log('json respons ok')
        
            setDesc('')
            setAmount(0)
            setCat('')
            setIsIncome(false)
            setError(null)
            // dispatch({type:'CREATE_TRAN',payload:json})

            navigate('/')
        }
    }

    return (
        <div>
            <h1>edit</h1>

            <form onSubmit={handleSubmit}>
                <label>name</label>
                <input type='text' value={desc} onChange={(e)=>setDesc(e.target.value)}/>

                <label>amount</label>
                <input 
                    type='number' 
                    value={amount} 
                    onChange={(e)=>setAmount(e.target.value)} 
                />

                <label>category</label>
                <input 
                    type='text' 
                    value={category} 
                    onChange={(e)=>setCat(e.target.value)}
                />
                
                <label>date</label>
                <input 
                    type='date' 
                    value={date} 
                    onChange={(e)=>setDate(e.target.value)}
                />

                <div className="flexContainer" >
                    <label>Is this transaction <strong>income</strong> ?</label>
                    <input 
                        type='checkbox' 
                        disabled 
                        value={isIncome} 
                        onChange={(e)=>setIsIncome(e.target.value)}
                    />
                </div>
                
                <div className="flexContainer" >
                    <label>Is this transaction <strong>recurring</strong>?</label>
                    <input 
                        type='checkbox' 
                        disabled 
                        value={isRecurring} 
                        onChange={(e)=>setIsRecurring(e.target.value)}
                    />
                </div>

                <div className="flexContainer" >
                    <label>Would you like to <strong>Highlight</strong> this transaction?</label>
                    <input 
                        type='checkbox' 
                        disabled 
                        value={isHighlight} 
                        onChange={(e)=>setIsHighLight(e.target.value)}
                    />
                </div>

                <button>submit</button>
                {error && (<div>{error}</div>)}
            </form>
        </div>
    )
}
export default Edit