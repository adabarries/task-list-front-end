import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const completeTask = (id) => {
    const tasksCopy = [...tasks];

    for (let task of tasksCopy) {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
    }
    // const tasksCopy = tasks.map((task) => {
    //   console.log('id', id);
    //   console.log('task id', task.id);
    //   if (task.id === id) {
    //     return !task.isComplete;
    //   } else {
    //     return task;
    // //   }
    // });
    setTasks(tasksCopy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList tasks={TASKS} completeTaskCallback={completeTask} />}
        </div>
      </main>
    </div>
  );
};

export default App;
