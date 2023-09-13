import { useState } from "react"
import { dateString } from "../helpers"
import TranDetails from "./TranDetails"

const Card = ({trans, day, title}) => {
    const [displayTrans , setDisplayTrans] = useState(false)

    const todayCard = trans.filter(d => dateString(d.createdAt) === day )
    const total = todayCard.reduce((acc, cur)=> acc + Number(cur.amount), 0 )

    function handleClick(){
        setDisplayTrans(!displayTrans)
    }

    return(
        <div className="card" onClick={handleClick}>
            <div className="cardheader">
                <h3>{title}</h3>
                <p>{total} Bhat total</p>
            </div>
            {displayTrans && todayCard.map((tran)=>(
                    <TranDetails key={tran._id} tran={tran} />
            ))}
        </div>
    )
}

export default Card