import React, {useState} from 'react'
import {
    Box,
    Button,
    Calendar,
    DropButton,
    Form,
    FormField,
    Keyboard,
    Layer,
    MaskedInput, Select,
    Text,
    TextInput
} from 'grommet'
import {numberValidatorCreate} from '../../../utils/validators'
import {Close, Schedule} from 'grommet-icons'

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

export default function SessionForm({closeModal, value, setValue, primaryValue, onSubmit, hallList, filmsList}) {

    const close = () => onClose(value.sessDate || primaryValue.sessDate, value.sessTime || primaryValue.sessTime)

    const [open, setOpen] = useState(undefined)

    const onClose = (nextDate, nextTime) => {

        setValue({
            ...value,
            sessDate: nextDate,
            sessTime: nextTime
        })

        setOpen(false)
        setTimeout(() => setOpen(undefined), 1);
    }

    return (
        <Layer
            onEsc={closeModal}
            onClickOutside={closeModal}
        >
            <Box {...elementsStyles.closeBtnBox} >
                <Button {...elementsStyles.closeBtn} onClick={closeModal}/>
            </Box>
            <Box {...elementsStyles.wrapper}>
                <Form
                    value={value}
                    onChange={(nextValue) => setValue(nextValue)}
                    onReset={() => setValue(primaryValue)}
                    onSubmit={onSubmit}
                    validate={'submit'}
                >
                    <FormField
                        label={'Film'}
                        name={'film'}
                        required
                    >
                        <Select
                            options={filmsList.map(fi => fi.FILM_TITLE)}
                            name={'film'}
                            onChange={({ option }) => setValue({
                                ...value,
                                film: option
                            })}
                            value={value.film}
                            {...elementsStyles.formInput}
                        />
                    </FormField>

                    <FormField
                        label={'Hall'}
                        name={'hall'}
                        required
                    >
                        <Select
                            options={hallList.map(hi => hi.HALL_ID)}
                            name={'hall'}
                            onChange={({ option }) => setValue({
                                ...value,
                                hall: option
                            })}
                            value={value.hall}
                            {...elementsStyles.formInput}
                        />
                    </FormField>

                    <FormField
                        label={'Price'}
                        name={'price'}
                        required
                        validate={numberValidatorCreate(0, 800)}
                    >
                        <TextInput name={'price'} {...elementsStyles.formInput}/>
                    </FormField>


                    <Box align={'center'} pad={'small'} margin={{bottom: 'medium'}}>
                        <DropButton
                            open={open}
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            dropAlign={{bottom: 'top'}}
                            dropContent={
                                <Box align={'center'}>
                                    <Calendar
                                        animate={true}
                                        date={value.sessDate || primaryValue.sessDate}
                                        onSelect={(selectedDate) => {
                                            setValue({
                                                ...value,
                                                sessDate: selectedDate
                                            })
                                        }}
                                        showAdjacentDays={false}
                                    />
                                    <Box
                                        flex={false}
                                        pad={'medium'}
                                        gap={'medium'}
                                    >
                                        <Keyboard
                                            onEnter={event => {
                                                event.preventDefault()
                                                close()
                                            }}
                                        >
                                            <MaskedInput
                                                mask={[
                                                    {
                                                        length: [1, 2],
                                                        options: [
                                                            '00',
                                                            '01',
                                                            '02',
                                                            '03',
                                                            '04',
                                                            '05',
                                                            '06',
                                                            '07',
                                                            '08',
                                                            '09',
                                                            '10',
                                                            '11',
                                                            '12',
                                                            '13',
                                                            '14',
                                                            '15',
                                                            '16',
                                                            '17',
                                                            '18',
                                                            '19',
                                                            '20',
                                                            '21',
                                                            '22',
                                                            '23',
                                                        ],
                                                        regexp: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                                                        placeholder: 'hh',
                                                    },
                                                    { fixed: ':' },
                                                    {
                                                        length: 2,
                                                        options: ['00', '15', '30', '45'],
                                                        regexp: /^[0-5][0-9]$|^[0-9]$/,
                                                        placeholder: 'mm',
                                                    }
                                                ]}
                                                value={value.sessTime || primaryValue.sessTime}
                                                name={'maskedInput'}
                                                onChange={event => {
                                                    setValue({
                                                        ...value,
                                                        sessTime: event.target.value
                                                    })
                                                }}
                                            />
                                        </Keyboard>
                                        <Box flex={false}>
                                            <Button label={'Ввести'} onClick={close} />
                                        </Box>
                                    </Box>
                                </Box>
                            }
                        >
                            <Box direction={'row'} gap={'medium'} align={'center'} pad={'small'}>
                                <Text color={value.sessDate ? undefined : 'dark-5'}>
                                    {
                                        value.sessDate
                                            ? `${new Date(value.sessDate).toLocaleDateString()} ${value.sessTime}`
                                            : 'Select date & time'
                                    }
                                </Text>
                                <Schedule />
                            </Box>
                        </DropButton>
                    </Box>



                    <Box {...elementsStyles.buttonsWrapper}>
                        <Button
                            type={'submit'}
                            label={'Отправить'}
                            primary
                            margin={{bottom: 'small'}}
                        />
                        <Button type={'reset'} label={'Очистить'}/>
                    </Box>
                </Form>
            </Box>
        </Layer>


    )
}