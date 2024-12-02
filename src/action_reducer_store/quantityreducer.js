const initialState={
    error:'false',
    counterValue:0

}
const QuantityReducer=(state=initialState,action)=>{
            switch(action.type){
                case 'increment':
                    return({
                        ...state,
                        counterValue:state.counterValue+1

                    });
                case 'decrement':
                        return({
                            ...state,
                            counterValue:state.counterValue-1
    
                        });

                default:
                    return state;
            }

}
export default QuantityReducer;