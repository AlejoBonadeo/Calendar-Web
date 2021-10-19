import React from 'react'

const CalendarEvent = ({event}) => {

    const {title, user} = event

    return (
        <div>
            <h6>{title}</h6>
            <strong>- {user.name}</strong>
        </div>
    )
}

export default CalendarEvent
