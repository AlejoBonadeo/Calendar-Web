import types from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import parseEvents from "../helpers/parseEvents";
import Swal from "sweetalert2";

export const eventStartAddNew = event => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth

        try {
            const response = await fetchWithToken('events', event, 'POST')
            const body = await response.json()
            
            if( body.ok ) {
                event.id = body.event.id
                event.user = {
                    _id: uid,
                    name
                }
                dispatch( eventAddNew( event ))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const eventAddNew = event => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = event => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActive = () => ({
    type: types.eventClearActive
})

export const updateEvent = event => ({
    type: types.eventUpdate,
    payload: event
})

export const deleteEvent = () => ({type: types.eventDelete})

export const eventStartLoading = () => {
    return async dispatch => {
        
        try {
            const response = await fetchWithToken('events')
            const body = await response.json()
            
            const events = parseEvents(body.events)
            dispatch(eventLoaded( events ))

        } catch (error) {
            console.log(error)
        }
    }
}

export const eventLoaded = events => ({
    type: types.eventLoaded,
    payload: events
})

export const eventStartUpdate = ( event ) => {
    return async dispatch => {
        try {
            const response = await fetchWithToken(`events/${ event.id }`, event, 'PUT')
            const body = await response.json()
            if( body.ok ){
                dispatch( updateEvent( event ) )
            } else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const eventStartDelete = ( ) => {
    return async (dispatch, getState) => {
        try {
            const { activeEvent } = getState().calendar
            const response = await fetchWithToken(`events/${ activeEvent.id }`, {}, 'DELETE')
            const body = await response.json()
            if( body.ok ){
                dispatch( deleteEvent() )
            } else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const eventLogOut = () => ({
    type: types.eventLogOut
})