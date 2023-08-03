import React, { useState } from 'react';
import ReactSwitch from 'react-switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';


const TodoList = () => {
  const [addTodos, setAddTodos] = useState('');
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Breakfast', status: 'pending' },
    { id: 2, title: 'Lunch', status: 'pending' },
    { id: 3, title: 'Dinner', status: 'pending' },

  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleTodos = (e) => {
    setAddTodos(e.target.value);
  };

  const maxId = Math.max(...todoList.map(todo => todo.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addTodos !== '') {
      //   const newTodo = {
      //     id: Date.now(),
      //     title: addTodos,
      //     status: 'pending'
      //   };
      // if (addTodos !== '') {
      //   setTodoList(prevTodos=>[...prevTodos, newTodo]);
      //   setAddTodos('')
      setTodoList(prevTodos => [...prevTodos, { title: addTodos, id: maxId + 1, status: 'pending' }]);
      setAddTodos('');
      setShowAlert(true);

    }
  };

  const handleTodoDelete = (id) => {
    setTodoList(prevTodos => prevTodos.filter(todo => todo.id !== id));
    setShowDeleteAlert(true);
  };

  const handleToggle = (id) => {
    setTodoList(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo, status: todo.status === 'pending' ? 'completed' : 'pending'
        };
      }
      return todo;
    }));
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>Add Todos</Typography>
      <form className='form' onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue='Add your Todo'
          value={addTodos}
          onChange={handleTodos}
          variant="outlined"
        />
        <Button style={{ marginLeft: "20px", marginTop: "8px", height: '40px' }} variant="contained" endIcon={<AddIcon />} type='submit' color="success">Add</Button>
      </form>
      {showAlert && (
        <Alert
          severity="success"
          onClose={(setTimeout(() => {
            setShowAlert(false)
          }, 2000))}
          sx={{ marginTop: '5px' }}
        >
          Todo added successfully!
        </Alert>
      )}
      {showDeleteAlert && (
        <Alert
          severity="warning"
          onClose={(setTimeout(() => {
            setShowDeleteAlert(false)
          }, 1000))}
          sx={{ marginTop: '16px' }}
        >
          Todo deleted successfully

        </Alert>
      )}

      <ul className="todo-list">
        {todoList.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <span id='text'><Typography variant="subtitle1" gutterBottom >{todo.title}</Typography></span>
            <Button color='error' variant="contained" startIcon={<DeleteIcon />} className="delete-button" onClick={() => handleTodoDelete(todo.id)}>Delete</Button>
            <span id='status'><Typography variant="subtitle1" gutterBottom >{todo.status}</Typography></span>
            <ReactSwitch
              className='toggle'
              checked={todo.status === 'completed'}
              onChange={() => handleToggle(todo.id)}
              onColor="#3f51b5"
              offColor="#bdbdbd"
              checkedIcon={<span style={{ padding: "10px", color: '#fff' }}>✓</span>}
              uncheckedIcon={<span style={{ padding: "5px", color: '#fff' }}>✕</span>}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
