import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Model = (props: any) => {
    const { open, handleClose, empInitialValues, empDataUpdate } = props;

    const empValidationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        category: Yup.string().required("Category is required"),
        availabilityStatus: Yup.string().required("Availability Status is required"),
        price: Yup.string().required("Price Status is required"),
        rating: Yup.string().required("Rating Status is required"),
    });
    return (
        <Modal
            BackdropProps={{
                onClick: () => { }
            }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Typography id="modal-modal-title" variant="h6" sx={{ marginBottom: '16px' }} component="h2">
                    Employee Data Update
                </Typography>
                <Formik
                    initialValues={empInitialValues}
                    validationSchema={empValidationSchema}
                    onSubmit={(values, actions) => {
                        console.log({ values, actions });
                        actions.setSubmitting(false);
                        empDataUpdate(values)
                    }}
                >
                    {({ values, errors, touched, handleChange }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <TextField
                                            id="title"
                                            name="title"
                                            label="Title"
                                            value={values.title}
                                            error={touched.title && Boolean(errors.title)}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <TextField
                                            id="category"
                                            name="category"
                                            label="Category"
                                            value={values.category}
                                            error={touched.category && Boolean(errors.category)}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <TextField
                                            id="availabilityStatus"
                                            name="availabilityStatus"
                                            label="Availability Status"
                                            value={values.availabilityStatus}
                                            error={touched.availabilityStatus && Boolean(errors.availabilityStatus)}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <TextField
                                            id="price"
                                            name="price"
                                            label="Price"
                                            type="number"
                                            value={values.price}
                                            error={touched.price && Boolean(errors.price)}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <TextField
                                            id="rating"
                                            name="rating"
                                            label="Rating"
                                            type="number"
                                            value={values.rating}
                                            error={touched.rating && Boolean(errors.rating)}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button variant="contained" onClick={handleClose} type="button">Close</Button> &nbsp; <Button variant="contained" type="submit">Submit</Button>
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}

export default Model;