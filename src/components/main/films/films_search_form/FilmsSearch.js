import React from 'react'
import {Box, Button, CheckBoxGroup, Form, FormField, RangeSelector, Stack, Text, TextInput} from 'grommet'
import {InProgress} from 'grommet-icons'

export default function FilmsSearch({formValues, setFormValues, ratingsData, genresData, loading, history}) {

    return (
        <>
            <Box
                direction={'row'}
                margin={{left: 'small', right: 'large'}}
            >
                <Form
                    value={formValues}
                    onChange={(nextValue) => {
                        setFormValues(nextValue)
                    }}
                >
                    <FormField
                        label={'Название'}
                        name={'title'}
                        margin={{top: 'medium', bottom: 'medium'}}
                    >
                        <TextInput name={'title'} margin={{bottom: 'medium'}}/>
                    </FormField>
                    {
                        loading
                            ? <InProgress
                                margin={{top: 'medium', bottom: 'medium'}}
                                size={'large'}
                                color={'brand'}
                            />
                            : <>
                                <FormField
                                    label={'Возрастные ограничения'}
                                    name={'ratings'}
                                    margin={{top: 'medium', bottom: 'medium'}}
                                >
                                    <CheckBoxGroup
                                        name={'ratings'}
                                        options={ratingsData.map(rd => rd.AGE_RATING_INFO)}
                                        margin={{bottom: 'medium'}}
                                    />
                                </FormField>
                                <FormField
                                    label={'Жанры'}
                                    name={'genres'}
                                    margin={{top: 'medium', bottom: 'medium'}}
                                >
                                    <CheckBoxGroup
                                        name={'genres'}
                                        options={genresData.map(g => g.GENRE_INFO)}
                                        margin={{bottom: 'medium'}}
                                    />
                                </FormField>
                            </>
                    }
                    <FormField
                        label={'Длительность'}
                        name={'duration'}
                        margin={{top: 'medium'}}
                    >
                        <Stack margin={{bottom: 'medium'}}>
                            <Box direction={'row'} justify={'between'}>
                                {[0, 30, 60, 90, 120, 150, 180].map(value => (
                                    <Box key={value} pad={'small'} border={false}>
                                        <Text style={{fontFamily: 'monospace'}}>
                                            {value}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                            <RangeSelector
                                direction="horizontal"
                                invert={false}
                                min={0}
                                max={180}
                                size={'full'}
                                round={'small'}
                                name={'duration'}
                                values={formValues.duration}
                                onChange={values => {
                                    console.log(values)
                                    setFormValues({

                                        ...formValues,
                                        duration: values
                                    })
                                }}
                            />
                        </Stack>
                    </FormField>
                    <Button
                        label={'Добавить фильм'}
                        onClick={() => history.push('/put_film')}
                        margin={{vertical: 'medium'}}
                    />
                </Form>
            </Box>
        </>
    )
}