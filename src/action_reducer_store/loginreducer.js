// const initialState = {
//     userId: null,
// };

// const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SET_USER_ID':
//             return { ...state, userId: action.payload };
//         case 'CLEAR_USER_ID':
//             return { ...state, userId: null };
//         default:
//             return state;
//     }
// };

// export default userReducer;
// In your reducer
const initialState = {
    userId: null,  // Default state, no user logged in
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            return { ...state, userId: action.payload };
        case 'CLEAR_USER_ID':
            return { ...state, userId: null };
        default:
            return state;
    }
};
export default userReducer;
