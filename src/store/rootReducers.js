import { combineReducers } from "redux";
import { BTFormReducer } from "./BTForm/slice";

export const rootReducer = combineReducers({
    BTForm : BTFormReducer
})