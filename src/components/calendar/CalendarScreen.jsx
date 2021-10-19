import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NavBar from '../ui/NavBar'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActive, eventSetActive, eventStartLoading } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

const localizer = momentLocalizer(moment)

const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)

    useEffect(() => {
        dispatch( eventStartLoading() )
    }, [dispatch])

    const onDoubleClick = e => {
        dispatch(uiOpenModal())
    }

    const onSelect = e => {
        dispatch(eventSetActive(e))
    }

    const onSelectSlot = e => {
        dispatch(eventClearActive())
    }

    const onViewChange = e => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {style}
    }

    return (
        <div className="calendar__screen">
            <NavBar/>

            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={ eventStyleGetter}
            onDoubleClickEvent={ onDoubleClick}
            onSelectEvent={ onSelect }
            onSelectSlot={ onSelectSlot }
            selectable={ true }
            onView={ onViewChange }
            view={lastView}
            components={{
                event: CalendarEvent
            }}
            />
            <CalendarModal/>
            {
                activeEvent && <DeleteEventFab/>
            }
            
            <AddNewFab/>
        </div>
    )
}

export default CalendarScreen
