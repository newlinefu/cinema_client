import React, {useEffect, useState} from 'react'
import {
    statSelect
} from '../../redux/selectors/selectors'
import {connect} from 'react-redux'
import {
    getStatFromServ
} from '../../redux/reducers/stat_reducer'
import Statistics from './Statistics'

function StatisticsContainer({stat, getStatFromServ}) {

    const [load, setLoad] = useState(true)

    useEffect(() => {
        setLoad(true)
        getStatFromServ()
            .then(() => setLoad(false))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }, [])


    if(load)
        return null
    return <Statistics stat={stat}/>
}

function mapStateToProps(state) {
    return {
        stat: statSelect(state)
    }
}
export default connect(mapStateToProps, {
    getStatFromServ
})(StatisticsContainer)