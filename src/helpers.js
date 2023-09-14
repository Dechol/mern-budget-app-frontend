

export const dateString = (str) => {
    const date = new Date(str).toDateString()
    return date    
}
export const dayLoop = (setState, weeks) =>{
    const n = (weeks * 7)
    const dayArr = []
    for(let i = 0; i < n; i++) {
        const thisdate = new Date(Date.now() - (i * 86400000)).toDateString()
        dayArr.push(thisdate)  
    }
    setState(dayArr)
}


