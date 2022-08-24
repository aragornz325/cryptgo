import { useContext } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionsContext } from "../providers/ActionsProvider"

const useActions = () => {

    const actions = useContext(actionsContext)
    const dispatch = useDispatch()

    const bindedActions = {}

    Object.keys(actions).forEach(key => {
        bindedActions[actions[key].name] = bindActionCreators(actions[key], dispatch)
    })

    return bindedActions
}

export default useActions