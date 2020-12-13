import React from 'react'
import {Box, CheckBoxGroup, Form, FormField, RangeSelector, Stack, Text, TextInput} from 'grommet'

export default function FilmsSearch({formValues, setFormValues, ratingsData}) {

    return (
        <>
            <Box
                direction={'row'}
                margin={{left: 'small', right: 'large'}}
            >
                <Form
                    value={formValues}
                    onChange={(nextValue) => setFormValues(nextValue)}
                >
                    <FormField
                        label={'Название'}
                        name={'title'}
                        margin={{top: 'medium'}}
                    >
                        <TextInput name={'title'} margin={{bottom:'medium'}}/>
                    </FormField>
                    <FormField
                        label={'Возрастные ограничения'}
                        name={'ratings'}
                        margin={{top: 'medium'}}
                    >
                        <CheckBoxGroup
                            name={'ratings'}
                            options={ratingsData.map(rd => rd.AGE_RATING_INFO)}
                            margin={{bottom:'medium'}}
                        />
                    </FormField>
                    <FormField
                        label={'Длительность'}
                        name={'duration'}
                        margin={{top: 'large'}}
                    >
                        <Stack margin={{bottom:'medium'}}>
                            <Box direction={'row'} justify={'between'}>
                                {[0, 30, 60, 90, 120, 150, 180, 300].map(value => (
                                    <Box key={value} pad={'small'} border={false}>
                                        <Text style={{ fontFamily: 'monospace' }}>
                                            {value}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                            <RangeSelector
                                direction="horizontal"
                                invert={false}
                                min={0}
                                max={300}
                                size={'full'}
                                round={'medium'}
                                name={'duration'}
                                values={formValues.duration}
                                onChange={values => setFormValues({
                                    ...formValues,
                                    duration: values
                                })}
                            />
                        </Stack>
                    </FormField>
                </Form>
            </Box>
        </>
    )
}