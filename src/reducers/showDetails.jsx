let initialState = [];

const showDetails = (state=initialState, action)=>{
    switch(action.type)
    {
        case 'SHOW_DETAILS':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default showDetails;