import { Button, Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import TextfieldWrapper from './Textfield';
import SelectWrapper from './Select';


const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    arrivealDate: '',
    departureDate: '',
    message: '',
    termsOfService: false
};

const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Required'),
    income: Yup.number()
        .required('Required'),
    profession: Yup.string().required('Required'),
    age: Yup.number().required('Required')
});

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Required'),
//     income: Yup.number()
//         .required('Required'),
//     profession: Yup.string().required('Required'),
//     age: Yup.number().required('Required')
// })
const professionOption = {
    reactDev: 'React developer',
    PythonDev: 'Python developer',
    netDev: '.Net developer',
}
const ageOption = {
    reactDev: 'React developer',
    PythonDev: 'Python developer',
    netDev: '.Net developer',
}

function FormPage() {
    return (
        <Formik
            initialValues={{
                ...INITIAL_FORM_STATE
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
                console.log(values);
            }}
        >
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <Grid item xs={6}>
                            <TextfieldWrapper
                                name="name"
                                label="Name"
                            />
                            <TextfieldWrapper
                                name="income"
                                label="Income"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectWrapper
                                name="profession"
                                label="Profession"
                                placeholder='profession'
                                options={professionOption}
                            />
                            <SelectWrapper
                                name="age"
                                label="Age"
                                options={ageOption}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button>
                                Submit Form
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

export default FormPage