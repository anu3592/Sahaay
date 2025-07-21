import { combineReducers } from "redux";
import showDetails from "./showDetails";
import sendSearchDatas from "./sendSearchDatas";


const rootReducer = combineReducers({
    showDetails,
    sendSearchDatas
})

export default rootReducer;