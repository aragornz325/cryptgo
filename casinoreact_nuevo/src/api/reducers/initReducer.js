import { SIDEBAR_TOGGLE } from "../actions/actionCreators";
import initState from "../initState";

const initReducer = (state=initState, action) => {
    switch (action.type) {
        case SIDEBAR_TOGGLE : 
            return {
                ...state,
                sidebar_open : !state.sidebar_open
            }
        default:
            return state;
    }
}

export default initReducer