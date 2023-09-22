import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTransContext } from "../hooks/useTransContext"

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
    const [isIncome, setIsIncome] = useState(null)
    const [isHighlight, setIsHighLight] = useState(null)
    const [error, setError] = useState(null)
    const {trans } = useTransContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()

    console.log('edit tran:',trans)
    useEffect(()=>{
        const setTran = () => {
            setDesc(trans[0].desc)
            setAmount(trans[0].amount)
            setCat(trans[0].category)
            setDate(trans[0].createdAt)
            setIsIncome(trans[0].isIncome)
            setIsHighLight(trans[0].isHighlighted)
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

        const tran = {desc, amount, category}

        const response = await fetch('/trans/'+ trans[0]._id ,{
            method: 'PATCH',
            mode:'cors',
            body: JSON.stringify(tran),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }            
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            console.log('json respons ok')
            // redirect user to homepage
            // setDesc('')
            // setAmount('')
            // setCat('')
            // setIsIncome(false)
            // setError(null)
            // setEmptyFields([])
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
                <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)} />
                <label>category</label>
                <input type='text' value={category} onChange={(e)=>setCat(e.target.value)}/>
                <label>date</label>
                <input type='date' disabled value={date} onChange={(e)=>setDate(e.target.value)}/>
                <label>income</label>
                <input type='checkbox' disabled value={isIncome} onChange={(e)=>setIsIncome(e.target.value)}/>
                <label>highlight</label>
                <input type='checkbox' disabled value={isHighlight} onChange={(e)=>setIsHighLight(e.target.value)}/>
                <button>submit</button>
            </form>
        </div>
    )
}
export default Edit