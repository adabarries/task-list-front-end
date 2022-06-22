import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('https://task-list-api-c17.herokuapp.com/tasks')
    .then((response) => {
      setTasks(response.data);
    })
    .catch((error) => {
      console.log('Something went wrong', error);
    });
  });

  const completeTask = (id) => {
    const tasksCopy = [...tasks];
    let targetTask;
    let completeIncomplete;

    for (let task of tasksCopy) {
      if (task.id === id) {
        targetTask = task;
        if (targetTask.isComplete === true) {
          completeIncomplete = 'mark_incomplete';
        } else {
          completeIncomplete = 'mark_complete';
        }

        // task.isComplete = !task.isComplete;
      }
    }

    axios.patch(`https://task-list-api-c17.herokuapp.com/tasks/${targetTask.id}/${completeIncomplete}`)
    .then(() => {
      targetTask.isComplete = !targetTask.isComplete;
      setTasks(tasksCopy);
    })
    .catch((error) => {
      console.log('Unable to do it', error);
    });
    };

  const deleteTask = (id) => {
    // const newTasks = tasks.filter((task) => task.id !== id);
    // setTasks(newTasks);
    axios.delete(`https://task-list-api-c17.herokuapp.com/tasks/${id}`)
    .then((response) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    })
    .catch((error) => {
      console.log('Unable to delete the task');
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList 
          tasks={tasks} 
          onClickCallback={completeTask} 
          onDeleteCallback={deleteTask}/>}
        </div>
      </main>
    </div>
  );
};

export default App;
