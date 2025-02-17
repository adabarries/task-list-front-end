import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';


const defaultTask = {title: '', description: '', isComplete: false};

const NewTaskForm = (props) => {
    const [taskData, setTaskData] = useState(defaultTask);

    const handleFormInput = (event) => {
        const inputElement = event.target;
        const name = inputElement.name;
        const value = inputElement.value;

        const newTaskData = {...taskData};
        newTaskData[name] = value;
        setTaskData(newTaskData);
    };

    const handleFormSubmission = (event) => {
        event.preventDefault();
        props.handleSubmission(taskData);
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <label htmlFor='title'>Title:</label>
            <input 
            name='title' 
            type='text' 
            value={taskData.title} 
            onChange={handleFormInput}/>
            <label htmlFor='description'>Description:</label>
            <input 
            name='description' 
            type='text' 
            value={taskData.description} 
            onChange={handleFormInput}/>
            <input type='submit' />
        </form>
    );
};

NewTaskForm.propTypes = {
    handleSubmission: PropTypes.func.isRequired,
};

export default NewTaskForm;