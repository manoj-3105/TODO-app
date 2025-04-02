import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const Todoform = ({addTask,fetchform}) => {
    console.log("Todoform rendered");

    const validationSchema = Yup.object({
        text: Yup.string("Enter The Task").required("Task should not be empty"),
        status: Yup.boolean().required("Select the status"),
    });

    const formik = useFormik({
        initialValues: {
            text: "",
            status: false,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5000/todos', values);
                console.log("Task created:", response.data);
                addTask(response.data);
                await fetchform
                formik.resetForm();
            } catch (error) {
                console.error("Error creating task", error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{
            maxWidth: '500px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solidrgb(2, 0, 0)',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#d65076',
            width: '95%',
            boxSizing: 'border-box',
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add New Task</h3>
            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    placeholder="Enter the task"
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        boxSizing: 'border-box',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                    onBlur={(e) => e.target.style.borderColor = '#ccc'}
                />
                {formik.errors.text && formik.touched.text && (
                    <p style={{ color: 'navy', margin: '5px 0', fontSize: '14px' }}>{formik.errors.text}</p>
                )}
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px', fontSize: '16px', color: 'white' }}>Completed:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        name="status"
                        checked={formik.values.status}
                        onChange={(event) => {
                            formik.setFieldValue('status', event.target.checked);
                        }}
                        style={{ display: 'none' }}
                    />
                    <div
                        style={{
                            width: '24px',
                            height: '24px',
                            border: '2px solid #ccc',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: formik.values.status ? '#4CAF50' : 'transparent',
                            color: 'white',
                        }}
                        onClick={() => formik.setFieldValue('status', !formik.values.status)}
                    >
                        {formik.values.status && '✓'}
                    </div>
                </div>
                {formik.errors.status && formik.touched.status && (
                    <p style={{ color: '#d32f2f', margin: '5px 0', fontSize: '14px' }}>{formik.errors.status}</p>
                )}
            </div>
            <button
                type="submit"
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '16px',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
                ADD TASK
            </button>
        </form>
    );
};

export default Todoform;