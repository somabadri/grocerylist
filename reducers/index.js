import { combineReducers } from "redux";

// Function that returns a reducer function that 
// updates a string
function createStringReducer(name = ''){
    return function stringReducer(state = "", action){
        switch (action.type) {
            case `UPDATE_${name}`:
                return action.payload
            default:
                return state;
        }
    };
};

// Function that returns a reducer function that 
// updates an array
function createArrayReducer(name = ''){
    return function arrayReducer(state = [], action){
        switch (action.type) {
            case `UPDATE_${name}`:
                return action.payload
            default:
                return state;
        }
    };
};

// Combing all the reducers using combineReducers()
const allReducers = combineReducers({
    item: createStringReducer('ITEM'),
    amount: createStringReducer('AMOUNT'),
    store: createStringReducer('STORE'),
    itemList: createArrayReducer('ITEMLIST'),
});

export default allReducers;