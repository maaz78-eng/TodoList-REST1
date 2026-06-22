import { useEffect, useState } from 'react'
import '../sass/App.scss'
import AddTodo from './AddTodo';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [title, setTitle]=useState("");
  const [input, setInput]=useState("");
  const [todos, setTodos]=useState([]);
  const [enableForm, setEnableForm]=useState(false);

  const API_URL = 'http://localhost:5159/api/todo';

  useEffect(()=>{
    fetch(`${API_URL}`)
    .then(res=>res.json())
    .then(json=>setTodos(json))
  },[])

  function addTodo(){
    if(title.trim()){
      fetch(`${API_URL}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title: title, description: input, isCompleted:false})
      })
      .then(res => res.json())
      .then(data => setTodos([...todos, data]))
      setInput('');
      setTitle('');
      setEnableForm(false);
    }
  }

  function markDone(id){
    fetch(`${API_URL}/${id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({IsCompleted:true})
    })
    .then(res=>res.json())
    .then(()=>setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo)))
  // setTodos(todos.map((todo)=>
  //   todo.id===id?{...todo, isCompleted: !todo.isCompleted}:todo
  // ))
}

  function EditTodo(id){
    fetch(`${API_URL}/${id}`,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({IsCompleted:false})
    })
    .then(res=>res.json())
    .then(()=>setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: false} : todo)))
}

  function deleteTodo(id){
    fetch(`${API_URL}/${id}`, {method: 'DELETE'})
    .then(() => setTodos(todos.filter(todo => todo.id !== id)));
  }


  return (
    <>
    <div className='container'>
      <div className='header'>
      <span className='header'>Todo List</span>
      <button onClick={()=>setEnableForm(true)}>Add Todo</button>
      {enableForm && (
      <div className="modalOverlay">
        <div className="modalContent">
          <AddTodo
            title={title}
            setTitle={setTitle}
            input={input}
            setInput={setInput}
            addTodo={addTodo}
            onClose={() => setEnableForm(false)}
          />
          </div>
        </div>
)}
    </div>
    <div>
      <h4>My Tasks</h4>
      {todos.length===0?(<p>No Tasks Pending</p>):
      (todos.filter(todo => !todo.isCompleted).map(todo=>(
        <div key={todo.id} className='todoItem'>
          <span>{todo.title}</span>
          <button onClick={()=>markDone(todo.id)} className='mrk-btn' >Mark As Done</button>
          <button onClick={()=>deleteTodo(todo.id)} className='del-btn' ><i class="bi bi-trash3"></i></button>
        </div>
      )))}
    </div>
    <div>
      <h4>Tasks Completed</h4>
      {todos.filter(todo => todo.isCompleted).map(todo=>(
    <div key={todo.id} className='todoItem' >
      <span>{todo.title}</span>
      <button onClick={()=>EditTodo(todo.id)} className='mrkun-btn' >Mark as Undone</button>
      <button onClick={()=>deleteTodo(todo.id)} className='del-btn' ><i class="bi bi-trash3"></i></button>
    </div>
  ))}
    </div>
    </div>
    </>
  )
}

export default App
