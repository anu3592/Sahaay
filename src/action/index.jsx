export const showDetails = (item)=>{
    return {
        type: 'SHOW_DETAILS',
        payload: item
    }
}

export const sendSearchData = (item)=>{
    return{
        type: 'SEND_DETAILS',
        payload: item
    }
}