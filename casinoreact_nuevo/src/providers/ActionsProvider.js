import { createContext } from "react"
import { getUserData , sidebarToggle } from "../api/actions/userActions"

export const actionsContext = createContext()
const { Provider } = actionsContext

const ActionsProvider = ({ children }) => {

    const actions = [
        getUserData , 
        sidebarToggle
    ]

    return (
        <Provider value={actions}>
            {children}
        </Provider>
    )
}

export default ActionsProvider