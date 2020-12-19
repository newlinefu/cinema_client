import React from 'react'
import {Box, Button, DateInput, Form, FormField, RangeSelector, Stack, Text} from 'grommet'


export default function SessionsSearchForm({
                                               formValues, setFormValues,
                                               defaultValue, openSessionForm
}) {
    return (
        <>
            <Box
                direction={'row'}
                margin={{left: 'small', right: 'large'}}
            >
                <Form
                    value={formValues}
                    onChange={(nextValue) => setFormValues(nextValue)}
                    onReset={() => setFormValues(defaultValue)}
                >
                    <FormField
                        label={'Дата сеанса'}
                        name={'date'}
                        margin={{top: 'large'}}
                    >
                        <DateInput
                            format={'mm/dd/yyyy'}
                            name={'date'}
                            margin={{bottom: 'medium'}}
                        />
                    </FormField>

                    <FormField
                        label={'Цена'}
                        name={'price'}
                        margin={{top: 'large'}}
                    >
                        <Stack margin={{bottom: 'medium'}}>
                            <Box direction={'row'} justify={'between'}>
                                {[0, 200, 400, 600, 800].map(value => (
                                    <Box key={value} pad={'small'} border={false}>
                                        <Text style={{fontFamily: 'monospace'}}>
                                            {value}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                            <RangeSelector
                                direction={'horizontal'}
                                invert={false}
                                min={0}
                                max={800}
                                size={'full'}
                                round={'small'}
                                name={'price'}
                                values={formValues.price}
                                onChange={values => {
                                    setFormValues({
                                        ...formValues,
                                        price: values
                                    })
                                }}
                            />
                        </Stack>
                    </FormField>
                    <Box margin={{vertical: 'medium'}}>
                        <Button
                            type={'reset'}
                            label={'Очистить'}
                        />
                    </Box>
                    <Box margin={{vertical: 'medium'}}>
                        <Button
                            label={'Добавить сеанс'}
                            onClick={openSessionForm}
                            margin={{vertical: 'large'}}
                            primary
                        />
                    </Box>
                </Form>
            </Box>
        </>
    )
}