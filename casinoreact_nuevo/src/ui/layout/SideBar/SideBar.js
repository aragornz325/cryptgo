import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {menu_routes_sidebar,games_routes_sidebar,general_routes_sidebar} from '../../../config/routes'
import useActions from '../../../hooks/useActions'
import "./SideBar.scss"
import SideBarMenu from './SideBarMenu'

const SideBar = () => {

    const { sidebarToggle } = useActions()
    const open = useSelector(({ init: { sidebar_open } }) => sidebar_open)

    return (
        <header className={`sidebar sidebar--${open ? "open" : "close"}`}>
            <h1 className='sidebar__brand'>
                <div className={`sidebar__logo-container sidebar__logo-container--${open ? "open" : "close"}`}>
                    <img className={`sidebar__logo sidebar__logo--${open ? "open" : "close"}`}src="/assets/icons/logo.png"/>
                    <img className={` sidebar__logo-small sidebar__logo-small--${open ? "open" : "close"}`} src="/assets/icons/logoSmall.png"/>
                </div>
            </h1>
            <button className='sidebar__toggler' onClick={sidebarToggle}></button>
            <SideBarMenu target="menu" open={open}/>
            <SideBarMenu target="games" open={open}/>
            <SideBarMenu target="general" open={open}/>
        </header>
    )
}

export default SideBar