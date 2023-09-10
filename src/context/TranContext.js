const { createContext, useReducer } = require("react");


export const TranContext = createContext()

export const transReducer = (state, action) => {
    switch(action.type){
        case 'SET_TRANS':
            return{
                trans: action.payload
            }
        case 'CREATE_TRAN':
            return{
                trans:[action.payload, ...state.trans] 
            }
        case 'DELETE_TRAN':
            return{
                trans: state.trans.filter((t)=>t._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TranContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(transReducer, {
        trans:null
    })

    return(
        <TranContext.Provider value={{...state, dispatch}} >
            {children}
        </TranContext.Provider>
    )

}
