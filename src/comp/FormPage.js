import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from "axios";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import TextfieldWrapper from './Textfield';
import SelectWrapper from './Select';


const INITIAL_FORM_STATE = {
    name: '',
    income: '',
    profession: '',
    age: '',
};

const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Required'),
    income: Yup.number("Enter numbers").required('Required'),
    profession: Yup.string().required('Required'),
    age: Yup.number().integer().required('Required')
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
const savedValue = {
    name: 'harsh',
    income: '12000',
    profession: 'reactDev',
    age: '23',
}

function FormPage() {
    const [formValues, setFormValues] = useState(null)
    const [employeeDB, setEmployeeDB] = useState(null)
    const [editId, seteditId] = useState(null)
    const [submit, setSubmit] = useState(null)


    const postEmployee = (employee) => {
        axios.post("http://localhost:3004/employee", employee)
            .then((data) => {
                console.log(data.data);
            })
            .catch((err) => console.log(err));
    }
    const getEmployee = () => {
        axios.get("http://localhost:3004/employee")
            .then((data) => {
                // console.log(data.data);
                setEmployeeDB(data.data);
            })
            .catch((err) => console.log(err));
    }
    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:3004/employee/${id}`)
            .then(() => console.log())
            .catch((error) => {
                console.log(error);
            });
    }
    const editEmployee = (id, employee) => {
        console.log("thisEmployee", employee, id)
        axios
            .put(`http://localhost:3004/employee/${editId}`, employee)
            .then((data) => {
                console.log(data)
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getEmployee()
        // console.log('comp rendered',employeeDB )
    }, [employeeDB])
    return (
        <Box>
            <Formik
                initialValues={formValues || { ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                // onSubmit is async thats why table update have no effect
                onSubmit={values => {
                    console.log('from onSubmit', values);
                    postEmployee(values);
                    // editEmployee(values)
                    setFormValues(values)

                }}
                enableReinitialize
            >
                {formik => {
                    // console.log('formik props', formik)
                    return (
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
                                        <TextfieldWrapper
                                            name="age"
                                            label="age"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <ButtonWrapper onClick={() => {
                                    setSubmit('add')
                                    console.log(' test from btn submit', submit)
                                }}>
                                    Submit Form
                                </ButtonWrapper> */}
                                        <Button type='button' fullWidth variant='outlined' onClick={() => {
                                            formik.submitForm()
                                            console.log(' test from btn submit', formik.values)
                                        }}>
                                            Submit Form
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <Button fullWidth variant="outlined" onClick={() => setFormValues(savedValue)}>
                                    Submit saved value
                                </Button> */}
                                        <Button fullWidth type='button' variant="outlined" onClick={() => {
                                            setSubmit('edit')
                                            console.log('from update button',editId, formValues)
                                            // editEmployee(editId, formValues)
                                        }}>
                                            Submit updated values
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>


            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Profession</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Income</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeDB?.map((row, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.profession}
                                </TableCell>
                                <TableCell align="right">
                                    {row.age}
                                </TableCell>
                                <TableCell align="right">
                                    {row.income}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" onClick={() => {
                                        // console.log("test from edit btn", {
                                        //     name: row.name,
                                        //     income: row.income,
                                        //     profession: row.profession,
                                        //     age: row.age,
                                        //     id: row.id,
                                        // })
                                        seteditId(row.id)
                                        setFormValues({
                                            name: row.name,
                                            income: row.income,
                                            profession: row.profession,
                                            age: row.age,
                                        })
                                        // console.log('edit button')
                                        // const thisEmployee = {
                                        //     name: row.name,
                                        //     income: row.income,
                                        //     profession: row.profession,
                                        //     age: row.age,
                                        //     id: row.id,
                                        // }
                                        // editEmployee(thisEmployee)

                                        // console.log('test',formValues)
                                    }}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" onClick={() => {
                                        console.log(row.id)
                                        deleteEmployee(row.id)
                                    }} >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>


        </Box >
    )
}

export default FormPage