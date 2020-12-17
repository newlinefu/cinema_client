import React, {useContext, useState} from 'react'
import {
    Box,
    Button, CheckBoxGroup,
    Form,
    FormField,
    Heading,
    Layer,
    RadioButtonGroup,
    ResponsiveContext,
    TextArea,
    TextInput
} from 'grommet'
import {NavLink} from 'react-router-dom'
import {FormPreviousLink} from 'grommet-icons'
import {lengthValidatorCreate, numberValidatorCreate, collLenCheck} from '../../../utils/validators'

const elementsStyles = {
    formWrapper: {
        width: 'large',
        background: 'light-6',
        pad: 'large',
        elevation: 'large',
        round: 'small'
    },
    headingWrapper: {
        align: 'center',
        pad: {bottom: 'medium'}

    },
    heading: {
        level: 1,
        color: 'dark-3'
    },
    buttonsWrapper: {
        direction: 'row',
        justify: 'between',
        margin: {top: 'large'}
    },
    formInput: {
        width: 'large'
    },
    submitBtn: {},
    clearBtn: {
        color: 'brand'
    },
    backLayer: {
        modal: false,
        position: 'left',
        animation: 'fadeIn'
    },
    backBtn: {
        plain: true
    }
}

export default function FilmForm({defaultValue, onSubmit, genres, ratings}) {

    const size = useContext(ResponsiveContext)
    const [value, setValue] = useState(defaultValue)

    const validators = {
        title: [lengthValidatorCreate(1, 50)],
        description: [lengthValidatorCreate(-1, 2000)],
        duration: [numberValidatorCreate(1, 180)],
        age_rating: [collLenCheck],
        genres: [collLenCheck]
    }

    function validateField(validatorsColl) {
        return (validatedValue) => {
            let validateResult
            for(let v of validatorsColl) {
                validateResult = v(validatedValue)
                if(validateResult.status === 'error') {
                    return validateResult
                }
            }
            return validateResult
        }
    }

    return (
        <>
            {
                size !== 'small' &&
                <Layer
                    {...elementsStyles.backLayer}
                >
                    <Button
                        {...elementsStyles.backBtn}
                        icon={<NavLink to={'/'}><FormPreviousLink color={'dark-3'} size={'xlarge'}/></NavLink>}
                    />
                </Layer>
            }
            <Box
                {...elementsStyles.formWrapper}
                margin={{left: 'auto', right: 'auto', top: size !== 'small' ? 'medium' : 'none'}}
                fill={size === 'small' || 'vertical'}
            >
                <Form
                    value={value}
                    onChange={nextValue => setValue(nextValue)}
                    onSubmit={onSubmit}
                    validate={'blur'}
                >
                    {
                        size === 'small' &&
                        <Button
                            {...elementsStyles.backBtn}
                            icon={<NavLink to={'/'}><FormPreviousLink color={'dark-3'} size={'large'}/></NavLink>}
                        />
                    }
                    <Box {...elementsStyles.headingWrapper}>
                        <Heading {...elementsStyles.heading}>SIGN UP</Heading>
                    </Box>
                    <FormField
                        label={'Название'}
                        name={'title'}
                        required={true}
                        validate={validateField(validators.title)}
                    >
                        <TextInput name={'title'} {...elementsStyles.formInput}/>
                    </FormField>

                    <FormField
                        label={'Описание фильма'}
                        name={'description'}
                        validate={validateField(validators.description)}
                    >
                        <TextArea resize={'vertical'} name={'description'} {...elementsStyles.formInput}/>
                    </FormField>

                    <FormField
                        label={'Длительность'}
                        name={'duration'}
                        required={true}
                        validate={validateField(validators.duration)}
                    >
                        <TextInput name={'duration'} {...elementsStyles.formInput}/>
                    </FormField>

                    <FormField
                        label={'Ограничение по возрасту'}
                        name={'age_rating'}
                        validate={validateField(validators.age_rating)}
                    >
                        <RadioButtonGroup
                            name={'age_rating'}
                            options={ratings.map(rd => rd.AGE_RATING_INFO)}
                        />
                    </FormField>
                    <FormField
                        label={'Жанры'}
                        name={'genres'}
                        validate={validateField(validators.genres)}
                    >
                        <CheckBoxGroup
                            name={'genres'}
                            options={genres.map(g => g.GENRE_INFO)}
                            margin={{bottom: 'medium'}}
                        />
                    </FormField>
                    <Box {...elementsStyles.buttonsWrapper}>
                        <Button
                            label={'Отправить'}
                            type={'submit'}
                            primary
                            {...elementsStyles.clearBtn}
                        />
                    </Box>
                </Form>
            </Box>
        </>
    )
}