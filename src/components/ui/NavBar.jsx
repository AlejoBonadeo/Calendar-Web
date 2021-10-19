import React from 'react'
import {FaSignOutAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { eventLogOut } from '../../actions/events'

const NavBar = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(startLogout())
        dispatch(eventLogOut())
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                { name }
            </span>

            <button className="btn btn-outline-danger" onClick={ handleLogOut }>
                <FaSignOutAlt/>
                <span> Log Out</span>
            </button>
        </div>
    )
}

export default NavBar
