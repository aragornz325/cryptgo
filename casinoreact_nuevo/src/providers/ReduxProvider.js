
import {Provider} from 'react-redux'
import store from '../api/store'

const ReduxProvider = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider