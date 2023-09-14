

export const dateString = (str) => {
    const date = new Date(str).toDateString()
    return date    
}
export const dayLoop = () =>{
    const dayArr = []
    for(let i = 0; i < 4; i++) {
        console.log(i)
        const thisdate = new Date(Date.now() - (i * 86400000)).toDateString()
        // console.log(t)
        console.log('today: ', thisdate)
        dayArr.push(thisdate)  
    }
    console.log(dayArr)
    return dayArr
}


