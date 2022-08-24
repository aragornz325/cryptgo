import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from '../../config/routes'

const Router = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {routes.map((route, index) => {
                    const Component = lazy(() => import(`../../ui/pages/${route.component}`))
                    return <Route key={index} path={route.path} exact={route.exact} element={<Component />} />
                })}
            </Routes>
        </Suspense>
    )
}
export default Router