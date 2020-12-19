import React, {useEffect, useState} from 'react'
import {
    seatsListSelect
} from '../../../redux/selectors/selectors'
import {connect} from 'react-redux'
import {
    getSeatsFromServ,
    getTicketsFromServ,
    buyTicketsWithServ,
    returnTicketsWithServ
} from '../../../redux/reducers/tickets_reducer'
import Seats from './Seats'
import {Text} from "grommet";

function SeatsContainer({
                            hallId, sessionId, seatsList,
                            getSeatsFromServ, getTicketsFromServ,
                            closeModal, price, buyTicketsWithServ,
                            returnTicketsWithServ
}) {

    const [loading, setLoading] = useState(false)
    const [actionState, setActionState] = useState('Продать')
    const [selectedSeats, setSelectedSeats] = useState([])

    useEffect(() => {
        setLoading(true)
        getSeatsFromServ(hallId)
            .then(() => getTicketsFromServ(sessionId))
            .then(() => setLoading(false))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }, [])

    function onSubmitBuyTicketsAction() {
        setLoading(true)
        buyTicketsWithServ(sessionId, selectedSeats)
            .then(() => getTicketsFromServ(sessionId))
            .then(() => setLoading(false))
            .then(() => setSelectedSeats([]))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }
    function onSubmitReturnTicketsAction() {
        setLoading(true)
        returnTicketsWithServ(sessionId, selectedSeats)
            .then(() => getTicketsFromServ(sessionId))
            .then(() => setLoading(false))
            .then(() => setSelectedSeats([]))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }
    return <Seats
        closeModal={closeModal}
        loading={loading}
        seatsList={seatsList}
        price={price}
        actionState={actionState}
        setActionState={setActionState}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        onSubmitBuyTicketsAction={onSubmitBuyTicketsAction}
        onSubmitReturnTicketsAction={onSubmitReturnTicketsAction}
    />
}

function mapStateToProps(state) {
    return {
        seatsList: seatsListSelect(state)
    }
}

export default connect(mapStateToProps, {
    getSeatsFromServ,
    getTicketsFromServ,
    buyTicketsWithServ,
    returnTicketsWithServ
})(SeatsContainer)