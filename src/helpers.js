

export const dateString = (str) => {
    const date = new Date(str).toDateString()
    return date    
}
export const dayLoop = (setState) =>{
    const dayArr = []
    for(let i = 0; i < 7; i++) {
        const thisdate = new Date(Date.now() - (i * 86400000)).toDateString()
        dayArr.push(thisdate)  
    }
    setState(dayArr)
}


