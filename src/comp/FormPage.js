import React, { useEffect, useState } from 'react'
import axios from "axios";
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextfieldWrapper from './Textfield';
import SelectWrapper from './Select';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'


const INITIAL_FORM_STATE = {
    name: '',
    income: '',
    profession: '',
    age: '',
};

const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Required'),
    income: Yup.number().required('Required'),
    profession: Yup.string().required('Required'),
    age: Yup.number().min(18).max(60).integer().required('Required')
});

const professionOption = {
    reactDevloper: 'React developer',
    PythonDevloper: 'Python developer',
    dotNetDevloper: 'DotNet developer',
}

function FormPage() {
    const [formValues, setFormValues] = useState(null)
    const [employeeDB, setEmployeeDB] = useState([])
    const [editId, setEditId] = useState(null)
    const [toggle, setToggle] = useState(true)

    const postEmployee = (employee) => {
        axios.post("http://localhost:3004/employee", employee)
            .then(() => {
                getEmployee()
            })
            .catch((err) => console.log(err));
    }
    const getEmployee = () => {
        axios.get("http://localhost:3004/employee")
            .then((data) => {
                setEmployeeDB(data.data);
            })
            .catch((err) => console.log(err));
    }
    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:3004/employee/${id}`)
            .then(() => {
                getEmployee()
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const editEmployee = (id, employee) => {
        axios
            .put(`http://localhost:3004/employee/${id}`, employee)
            .then((data) => {
                getEmployee()
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getEmployee()
    }, [])
    return (
        <Box >
            <Formik
                initialValues={formValues || { ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={value => {
                    console.log(value)
                    
                }}
                enableReinitialize
            >
                {formik => {
                    return (
                        <Form>
                            <Grid container  >
                                <Grid item xs={12}>

                                    <Grid item xs={12} >
                                        <TextfieldWrapper
                                            name="name"
                                            label="Name"
                                            sx={{margin:'.5rem 0rem'}}
                                        />
                                        <TextfieldWrapper
                                            name="income"
                                            label="Income"
                                            sx={{margin:'.5rem 0rem'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} rowSpacing={1}>
                                        <SelectWrapper
                                            name="profession"
                                            label="Profession"
                                            placeholder='profession'
                                            options={professionOption}
                                            sx={{margin:'.5rem 0rem'}}
                                        />
                                        <TextfieldWrapper
                                            name="age"
                                            label="age"
                                            sx={{margin:'.5rem 0rem'}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} rowSpacing={1}>
                                        <Button sx={{margin:'.5rem 0rem'}} startIcon={<AddIcon />} fullWidth type='button'  variant='outlined' onClick={() => {
                                            formik.submitForm()
                                            postEmployee(formik.values);
                                            formik.resetForm();
                                        }}>
                                            Add New Employee
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {toggle ? <Button sx={{margin:'.5rem 0rem'}} startIcon={<RedoIcon />} fullWidth type='button' variant="outlined" onClick={() => {
                                            formik.submitForm()
                                            setFormValues(formik.values)
                                            setToggle(false)
                                        }}>
                                            Submit updated information
                                        </Button>
                                            :
                                            <Button startIcon={<DoneIcon />} fullWidth type='button' variant="outlined" onClick={() => {
                                                editEmployee(editId, formValues)
                                                setToggle(true)
                                                formik.resetForm();
                                            }}>
                                                Done
                                            </Button>}
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>

            <TableContainer component={Paper} sx={{margin:'.5rem 0rem'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant='h6'>Name</Typography></TableCell>
                            <TableCell align="right"><Typography variant='h6'>Profession</Typography></TableCell>
                            <TableCell align="right"><Typography variant='h6'>Age</Typography></TableCell>
                            <TableCell align="right"><Typography variant='h6'>Income</Typography></TableCell>
                            <TableCell align="right"><Typography variant='h6'>Actions</Typography></TableCell>
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
                                    <Button sx={{margin:'0px 5px 0px 0px'}} variant="outlined" onClick={() => {
                                        setEditId(row.id)
                                        setFormValues({
                                            name: row.name,
                                            income: row.income,
                                            profession: row.profession,
                                            age: row.age,
                                        })
                                    }}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" onClick={() => {
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