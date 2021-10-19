import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
};

const initialState = {
    title: 'Event',
    notes: '',
    start: moment().minutes(0).seconds(0).add(1, 'hours').toDate(),
    end: moment().minutes(0).seconds(0).add(2, 'hours').toDate()
}

Modal.setAppElement('#root');

const CalendarModal = () => {

    const [startDate, setStartDate] = useState(moment().minutes(0).seconds(0).add(1, 'hours').toDate())

    const [endDate, setEndDate] = useState(moment().minutes(0).seconds(0).add(2, 'hours').toDate())

    const [form, setForm] = useState({
        title: 'Event',
        notes: '',
        start: moment().minutes(0).seconds(0).add(1, 'hours').toDate(),
        end: moment().minutes(0).seconds(0).add(2, 'hours').toDate()
    })
    
    const { title, notes, start, end } = form

    
    const dispatch = useDispatch()
    
    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)

    useEffect(() => {
        if( activeEvent ){
            setForm(activeEvent)
            setStartDate(activeEvent.start)
            setEndDate(activeEvent.end)
        }
        else{
            setForm(initialState)
        }
    }, [activeEvent])

    const handleInputChange = ({target}) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = e => {
        setStartDate(e)
        setForm({
            ...form,
            start: e
        })
    }
    const handleEndDateChange = e => {
        setEndDate(e)
        setForm({
            ...form,
            end: e
        })
    }

    const closeModal = () => {
        dispatch(uiCloseModal())
        dispatch(eventClearActive())
        setForm(initialState)
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        if(moment(start).isSameOrAfter(moment(end))){
            return Swal.fire('Error', 'Start date should be before end date!', 'error') 
        }

        if(activeEvent){
            dispatch(eventStartUpdate( form ))
        }
        else {
            dispatch(eventStartAddNew( form ))
        }
        /* TODO: agregar a base */
        closeModal()
    }

    return (
        <Modal
        isOpen={ modalOpen }
        /* onAfterOpen={afterOpenModal} */
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        closeTimeoutMS={200}
        overlayClassName="modal__fondo"
      >
        <h1> {activeEvent ? 'Edit Event' : 'New Event'} </h1>
        <hr />
        <form className="container" onSubmit={ handleSubmit }>

            <div className="form-group">
                <label>Starts</label>
                <DateTimePicker 
                onChange={ handleStartDateChange } 
                value={ startDate }
                className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Ends</label>
                <DateTimePicker 
                onChange={ handleEndDateChange } 
                value={ endDate }
                className="form-control"
                minDate={startDate}
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Title and notes</label>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                    autoComplete="off"
                    required
                />
                <small id="emailHelp" className="form-text text-muted">Brief Description</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notes"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange={ handleInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Additional Info</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
      </Modal>
    )
}

export default CalendarModal
