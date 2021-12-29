import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Breadcrumbs from "./components/Breadcrumbs";
import IssueBoard from './pages/IssueBoard';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import Task from './pages/Task';
import './App.css';

function App() {
  const [links, setLinks] = useState([]);

  const [toDo, setToDo] = useState([
    {
      id: 'FC–7',
      title: 'As a translator, I want integrate Crowdin webhook to notify translators about changed strings',
      priority: 'major',
      storyPoints: 2
    },
    {
      id: 'BC–14',
      title: 'As a user, I want to see actual overusage price for next download',
      priority: 'unknown',
      storyPoints: 1
    }
  ]);

  const [inProgress, setInProgress] = useState([
    {
      id: 'MAR–14',
      title: 'As an external contributor, I want to be able to see status of uploaded materials',
      priority: 'minor',
      storyPoints: 3
    },
    {
      id: 'FC–19',
      title: 'Replace JustComments with something',
      priority: 'critical',
      storyPoints: 3
    }
  ]);

  const [test, setTest] = useState([
    {
      id: 'FC–13',
      title: 'As a user, I want to access Intercom help center, so that I am not confused by Crisp',
      priority: 'normal',
      storyPoints: 1
    },
    {
      id: 'FC–17',
      title: 'Remove requests to ipfy service from frontend',
      priority: 'critical',
      storyPoints: 2
    }
  ]);

  const [done, setDone] = useState([
    {
      id: 'FC–13',
      title: 'As a user, I want to access Intercom help center, so that I am not confused by Crisp',
      priority: 'normal',
      storyPoints: 1
    },
    {
      id: 'FC–17',
      title: 'Remove requests to ipfy service from frontend',
      priority: 'critical',
      storyPoints: 2
    }
  ]);

  const [columns, setColumns] = useState([
    { id: 1, title: 'To do', items: toDo },
    { id: 2, title: 'In progress', items: inProgress },
    { id: 3, title: 'Test', items: test },
    { id: 4, title: 'Done', items: done }
  ]);

  const filterTask = (task, string) => (
    task.filter((item) => (
      item.id.toLowerCase().includes(string) || item.title.toLowerCase().includes(string)
    ))
  );

  function searchTask(task) {
    const newToDo = filterTask(toDo, task);
    const newInProgress = filterTask(inProgress, task);
    const newTest = filterTask(test, task);
    const newDone = filterTask(done, task);

    setColumns([
      { id: 1, title: 'To do', items: newToDo },
      { id: 2, title: 'In progress', items: newInProgress },
      { id: 3, title: 'Test', items: newTest },
      { id: 4, title: 'Done', items: newDone }
    ]);
  }
  
  function addNewTask(form) {
    switch (form.status) {
      case 'To Do':
        setToDo([...toDo, form]);
        break;

      case 'In progress':
        setInProgress([...inProgress, form]);
        break;

      case 'Test':
        setTest([...test, form]);
        break;

      case 'Done':
        setDone([...done, form]);
        break;
    
      default:
        break;
    }
  }

  useEffect(() => searchTask(''), [toDo, inProgress, test, done]);

  function getItem(id) {
    id = id.toLowerCase();

    const newToDo = filterTask(toDo, id);
    const newInProgress = filterTask(inProgress, id);
    const newTest = filterTask(test, id);
    const newDone = filterTask(done, id);

    return [...newToDo, ...newInProgress, ...newTest, ...newDone][0];
  }
  
  const [currentItem, setCurrentItem] = useState({});
  const [currentColumn, setCurrentColumn] = useState({});

  function dragStartHandler(e, column, item) {
    setCurrentItem(item);
    setCurrentColumn(column);
  }

  function dropHandler(e, column, item) {
    e.preventDefault();
    e.stopPropagation();

    const index = currentColumn.items.indexOf(currentItem);
    const dropIndex = column.items.indexOf(item) + 1;

    currentColumn.items.splice(index, 1);
    column.items.splice(dropIndex, 0, currentItem);

    setColumns(columns.map(col => {
      if (col.id === column.id) {
        return column;
      } else if (col.id === currentColumn.id) {
        return currentColumn;
      } else {
        return col;
      }
    }));
  }

  function dropColumnHandler(e, column) {
    const index = currentColumn.items.indexOf(currentItem);

    column.items.push(currentItem);
    currentColumn.items.splice(index, 1);

    setColumns(columns.map(col => {
      if (col.id === column.id) {
        return column;
      } else if (col.id === currentColumn.id) {
        return currentColumn;
      } else {
        return col;
      }
    }));
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Breadcrumbs links={ links }/> }>
          <Route index element={
            <IssueBoard
              setLinks={ setLinks }
              searchTask={ searchTask }
              columns={ columns }
              dragStartHandler={ dragStartHandler }
              dropHandler={ dropHandler }
              dropColumnHandler={ dropColumnHandler }
            />
          }/>
          <Route path='task' element={
            <NewTask links={ links } setLinks={ setLinks } task={ addNewTask }/>
          }/>
          <Route path='task-:id' element={ <Task setLinks={ setLinks } getItem={ getItem }/> }/>
          <Route path='task-:id/edit' element={ <EditTask setLinks={ setLinks }/> }/>
          <Route path='*' element={ <Navigate to='/'/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
