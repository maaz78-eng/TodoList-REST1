import '../sass/App.scss'

function AddTodo({ title, setTitle, input, setInput, addTodo, onClose }){
    return(
        <div className='todoBox' >
            <h3>Todo List</h3>
            <input type="text" placeholder='Enter Task Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder='Enter Task Description' value={input} onChange={(e)=>setInput(e.target.value)} />
            <button onClick={addTodo} className='mrk-btn' >Add</button>
            <button onClick={onClose} className='del-btn'>Cancel</button>
    </div>
    )
}

export default AddTodo;