import React from 'react'
import {FaTrash} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events'
const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(eventStartDelete())
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={ handleDelete }>
            <FaTrash/>
            <span> Delete</span>
        </button>
    )
}

export default DeleteEventFab
