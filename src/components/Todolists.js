import React, { useEffect, useState } from "react";
import axios from "axios";
import Todoform from './Todoform';
import { motion, AnimatePresence } from 'framer-motion';

const Todolists = () => {
    console.log("Todolists rendered");

    const [todos, setTodos] = useState([]);

    const fetchform = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todos');
            console.log("api response:", response.data);
            setTodos(response.data);
        } catch (error) {
            console.error("Error Fetching Tasks", error);
        }
    };

    useEffect(() => {
        fetchform();
    }, []);

    const addTask = (newTask) => {
      setTodos([...todos, newTask]);
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        alert("Your Task is deleted");
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const updateTask = async (id) => {
        const newText = prompt("Enter the new task");
        const newStatus = window.confirm("Is the task completed?");

        if (newText !== null) {
            const taskToUpdate = todos.find(todo => todo.id === id);

            if (taskToUpdate) {
                try {
                    await axios.put(`http://localhost:5000/todos/${id}`, {
                        text: newText,
                        status: newStatus,
                    });

                    alert('Task updated successfully');
                    fetchform();

                    setTodos(
                        todos.map(todo =>
                            todo.id === id ? { ...todo, text: newText, status: newStatus } : todo
                        )
                    );
                } catch (error) {
                    console.error('Failed to update task:', error);
                    alert('Failed to update task');
                }
            } else {
                console.error('Task not found for update');
                alert('Task not found for update');
            }
        }
    };

    return (
        <div style={{
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
            width: '95%',
            boxSizing: 'border-box',
            backgroundColor: '#98b4d4',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>Task Lists</h2>
            <div style={{ width: '100%' }}>
                <Todoform addTask={addTask} fetchform={fetchform} />
            </div>
            <ul style={{
                listStyleType: 'none',
                padding: 0,
                width: '90%',
                boxSizing: 'border-box',
                margin: '0 auto',
            }}>
                <AnimatePresence>
                    {todos.map((todo) => (
                        <motion.li
                            key={todo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                                flexWrap: 'wrap',
                                boxSizing: 'border-box',
                            }}
                        >
                            <span style={{
                                flex: 1,
                                minWidth: '200px',
                                marginBottom: '8px',
                                color: '#34495e',
                                wordBreak: 'break-word', // Add word break to prevent text overflow
                            }}>
                                {todo.text} - {todo.status ? 'Completed' : 'Pending'}
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                <motion.button
                                    onClick={() => updateTask(todo.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        backgroundColor: '#e3f2fd',
                                        color: '#1976d2',
                                        padding: '9px 15px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        margin: '5px 5px 5px 0', // Adjusted margin
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    &#x270E;
                                </motion.button>
                                <motion.button
                                    onClick={() => deleteTask(todo.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        backgroundColor: '#ffebee',
                                        color: '#d32f2f',
                                        padding: '8px 12px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        margin: '5px 0', // Adjusted margin
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    &#x1F5D1;
                                </motion.button>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default Todolists;