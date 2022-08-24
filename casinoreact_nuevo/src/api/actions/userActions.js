import { SIDEBAR_TOGGLE } from "./actionCreators"

export const getUserData = () => async dispatch => {
    dispatch({ type: 'GET_USER_DATA_REQUEST' })
    try {
        const pedido = await fetch('http://localhost:5000/api/auth/user', {
            method: 'POST',
            credentials: 'include'
        })
        const data = await pedido.json()
        dispatch({type:"GET_USER_DATA_SUCCESS", payload: data})
    } catch (error) {
        dispatch({type:"GET_USER_DATA_ERROR", payload: error})
    }
}

export const sidebarToggle = () => ({ type: SIDEBAR_TOGGLE })