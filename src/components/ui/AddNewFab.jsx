import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { eventClearActive } from '../../actions/events'
import { uiOpenModal } from '../../actions/ui'

const AddNewFab = () => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(eventClearActive)
        dispatch(uiOpenModal())
    }

    return (
        <button className="btn btn-primary fab" onClick={handleClick}>
            <FaPlus/>
        </button>
    )
}

export default AddNewFab
