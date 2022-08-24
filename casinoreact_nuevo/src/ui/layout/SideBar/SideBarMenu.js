import { Link } from "react-router-dom"
import { sidebar_routes } from "../../../config/routes"

const SideBarMenu = ({ target, open }) => {
    return (
        <div className={`sidebar-menu sidebar-menu--${open ? "open" : "close"}`}>
            <h2 className={`sidebar-menu__title sidebar-menu__title--${open ? "open" : "close"}`}>{target}</h2>
            <div className={`sidebar-menu__links sidebar-menu__links--${open ? "open" : "close"}`}>
                {sidebar_routes[`${target}_routes_sidebar`].map(route => (
                    <div className={`sidebar-menu__links-item sidebar-menu__links-item--${open ? "open" : "close"}`}>
                        <div className={`sidebar-menu__link-icon sidebar-menu__link-icon--${open ? "open" : "close"}`} style={{
                            backgroundImage: `url(${route.icon})`
                        }}/>
                        <Link className={`sidebar-menu__link sidebar-menu__link--${open ? "open" : "close"}`} key={route.id} to={route.url}>{route.text}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBarMenu