import moment from "moment";

const parseEvents = ( events = [] ) => {
    return events.map(event => ({
        ...event,
        end: moment( event.end ).toDate(),
        start: moment( event.start ).toDate()
    }))
}

export default parseEvents