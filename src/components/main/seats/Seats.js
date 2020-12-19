import React from 'react'
import {Box, Button, Layer, RadioButtonGroup, Text} from "grommet";
import {Close, InProgress} from "grommet-icons";

const elementsStyles = {
    closeBtnBox: {
        align: 'end',
        margin: 'small'
    },
    closeBtn: {
        icon: <Close size={'medium'}/>
    },
    wrapper: {
        fill: true,
        justify: 'center',
        width: 'large',
        color: 'brand',
        pad: 'large'
    }
}

export default function Seats({
                                  closeModal, seatsList, price, actionState, setActionState,
                                  selectedSeats, setSelectedSeats, onSubmitReturnTicketsAction,
                                  onSubmitBuyTicketsAction, loading
}) {

    return <Box>
        {
            loading
                ? <InProgress
                    margin={{top: 'medium', bottom: 'medium'}}
                    size={'large'}
                    color={'brand'}
                />
                : <Layer
                    onEsc={closeModal}
                    onClickOutside={closeModal}
                    width={'large'}
                >
                    <Box {...elementsStyles.closeBtnBox} >
                        <Button {...elementsStyles.closeBtn} onClick={closeModal}/>
                    </Box>
                    <Box
                        direction={'row'}
                    >
                        <Box
                            margin={'medium'}
                        >
                            <RadioButtonGroup
                                name={'state'}
                                options={['Продать', 'Вернуть']}
                                value={actionState}
                                onChange={(event) => {
                                    setActionState(event.target.value)
                                    setSelectedSeats([])
                                }}
                                margin={{vertical: 'medium'}}
                            />
                            <Button
                                label={actionState}
                                margin={{top: 'large'}}
                                primary
                                disabled={selectedSeats.length === 0}
                                onClick={
                                    actionState === 'Продать'
                                        ? onSubmitBuyTicketsAction
                                        : onSubmitReturnTicketsAction
                                }
                            />
                        </Box>


                        <Box
                            width={'large'}
                            direction={'row'}
                            heigth={'xlarge'}
                            wrap={true}
                            justify={'around'}
                        >
                            {
                                seatsList.map(x => <Box
                                    margin={'small'}
                                    background={
                                        x.ticket
                                            ? selectedSeats.find(seat => seat === x.seat.SEAT_HALL_ID)
                                            ? 'neutral-4'
                                            : 'status-error'
                                            : selectedSeats.find(seat => seat === x.seat.SEAT_HALL_ID)
                                            ? 'neutral-1'
                                            : 'accent-1'
                                    }
                                    direction={'column'}
                                    pad={'small'}
                                    align={'center'}
                                    onClick={() => {
                                        if(selectedSeats.find(seat => seat === x.seat.SEAT_HALL_ID)) {
                                            setSelectedSeats([...selectedSeats.filter(ss => ss !== x.seat.SEAT_HALL_ID)])
                                        } else if((x.ticket && actionState === 'Вернуть') || (!x.ticket && actionState === 'Продать'))
                                            setSelectedSeats([
                                                ...selectedSeats,
                                                x.seat.SEAT_HALL_ID
                                            ])
                                    }}
                                >
                                    <Text><b>{x.seat.SEAT_NUMBER}</b></Text>
                                    <Text>{price * x.seat.PRICE_CATEGORY_COEF}</Text>
                                </Box>)
                            }
                        </Box>
                    </Box>
                </Layer>
        }

    </Box>
}