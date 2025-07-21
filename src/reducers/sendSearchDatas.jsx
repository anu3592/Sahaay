let initialState = [];

const sendSearchDatas = (state=initialState, action)=>{
    switch(action.type)
    {
        case 'SEND_DETAILS':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default sendSearchDatas;