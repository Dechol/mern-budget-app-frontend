import { useState } from "react"
import { dateString } from "../helpers"
import TranDetails from "./TranDetails"

const Card = ({trans, day, title}) => {
    const [displayTrans , setDisplayTrans] = useState(false)

    const todayCard = trans.filter(d => dateString(d.createdAt) === day )
    const total = todayCard.reduce((acc, cur) => cur.isIncome? acc - Number(cur.amount) : acc + Number(cur.amount), 0 )

    function handleClick(e){
        setDisplayTrans(!displayTrans)
    }

    return(
        <div className="card" onClick={(e)=>handleClick(e)}>
            <div className="cardheader">
                <h3>{title}</h3>
                {(total < 0) ? <p className="income">{total *-1} income</p> : <p>{total} expense</p>}
            </div>
            {displayTrans && todayCard.map((tran)=>(
                    <TranDetails key={tran._id} tran={tran} />
            ))}
        </div>
    )
}

export default Card