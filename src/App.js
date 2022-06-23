import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
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
        if (targetTask.is_complete === true) {
          completeIncomplete = 'mark_incomplete';
        } else {
          completeIncomplete = 'mark_complete';
        }
      }
    }

    axios
      .patch(
        `https://task-list-api-c17.herokuapp.com/tasks/${targetTask.id}/${completeIncomplete}`
      )
      .then(() => {
        // eslint-disable-next-line camelcase
        targetTask.is_complete = !targetTask.is_complete;
        setTasks(tasksCopy);
      })
      .catch((error) => {
        console.log('Unable to do it', error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://task-list-api-c17.herokuapp.com/tasks/${id}`)
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
          {
            <TaskList
              tasks={tasks}
              onClickCallback={completeTask}
              onDeleteCallback={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
