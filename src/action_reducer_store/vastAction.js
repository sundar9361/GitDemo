export const IncrementAction=()=>dispatch=>{
    dispatch({
        type:'increment',
       
    })
}
export const DecrementAction=()=>dispatch=>{
    dispatch({
        type:'decrement',
        
    })
}

export const setUserId = (userId) => ({
    type: 'SET_USER_ID',
    payload: userId,
});

export const clearUserId = () => ({
    type: 'CLEAR_USER_ID',
});
