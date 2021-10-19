import types from "../types/types";
/* {
        id: new Date().getTime(),
        title: 'Halloween',
        start: moment().add(19, 'days').toDate(),
        end: moment().add(19, 'days').toDate(),
        notes: 'W',
        user: {
            _id: '123',
            name: 'Sergio'
        }
    } */
const initialState = {
    events: [],
    activeEvent: null
}


const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew: 
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case types.eventClearActive: 
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdate: 
            return {
                ...state,
                events: state.events.map( event => event.id === action.payload.id ? action.payload : event)
            }
        case types.eventDelete: 
            return {
                ...state,
                events: state.events.filter( event => event.id !== state.activeEvent.id),
                activeEvent: null
            }
        case types.eventLoaded: 
            return {
                ...state,
                events: [ ...action.payload ]
            }
        case types.eventLogOut: 
            return initialState
        default:
            return state
    }
}

export default calendarReducer
