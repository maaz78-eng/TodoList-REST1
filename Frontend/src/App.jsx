import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle]=useState("");
  const [input, setInput]=useState("");
  const [todos, setTodos]=useState([]);

  const API_URL = 'http://localhost:5159/api/todo';

  useEffect(()=>{
    fetch(`${API_URL}`)
    .then(res=>res.json())
    .then(json=>setTodos(json))
  },[])

  function addTodo(){
    if(input.trim()){
      fetch(`${API_URL}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title: title, description: input, isCompleted:false})
      })
      .then(res => res.json())
      .then(data => setTodos([...todos, data]))
      setInput('');
      setTitle('');
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

  function deleteTodo(id){
    fetch(`${API_URL}/${id}`, {method: 'DELETE'})
    .then(() => setTodos(todos.filter(todo => todo.id !== id)));
  }


  return (
    <>
    <div className='todoBox' >
      <h3>Todo List</h3>
      <input type="text" placeholder='Enter Task Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" placeholder='Enter Task Description' value={input} onChange={(e)=>setInput(e.target.value)} />
      <button onClick={addTodo} >Add</button>
    </div>
    <div>
      <h4>My Tasks</h4>
      {todos.length===0?(<p>No Tasks Pending</p>):
      (todos.filter(todo => !todo.isCompleted).map(todo=>(
        <div key={todo.id} className='todoItem'>
          <span>{todo.title}</span>
          <button onClick={()=>markDone(todo.id)} >Mark As Done</button>
          <button onClick={()=>deleteTodo(todo.id)} >Delete</button>
        </div>
      )))}
    </div>
    <div>
      <h4>Tasks Completed</h4>
      {todos.filter(todo => todo.isCompleted).map(todo=>(
    <div key={todo.id}>{todo.title}</div>
  ))}
    </div>
    </>
  )
}

export default App
