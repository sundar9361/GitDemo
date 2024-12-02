import { configureStore } from '@reduxjs/toolkit';
import QuantityReducer from './quantityreducer'; 
import userReducer from './loginreducer'; 

export default configureStore({
    reducer: {
        Quantity: QuantityReducer, 
        User: userReducer 
    }
});
