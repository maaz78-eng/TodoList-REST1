using APIDemoApp.Data;
using APIDemoApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIDemoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> Get()
        {
            var todos = await _context.Todos.ToListAsync();
            return Ok(todos);
        }

        // GET: api/todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> Get(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound(new { message = "Todo not found" });
            }

            return Ok(todo);
        }

        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult<Todo>> Post([FromBody] Todo todo)
        {
            if (string.IsNullOrEmpty(todo.Title))
            {
                return BadRequest(new { message = "Title is required" });
            }

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
        }

        // PUT: api/todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Todo todo)
        {
            var existingTodo = await _context.Todos.FindAsync(id);

            if (existingTodo == null)
            {
                return NotFound(new { message = "Todo not found" });
            }

            //existingTodo.Title = todo.Title;
            //existingTodo.Description = todo.Description;
            existingTodo.IsCompleted = todo.IsCompleted;

            _context.Todos.Update(existingTodo);
            await _context.SaveChangesAsync();

            return Ok(existingTodo);
        }

        // PATCH: api/todo/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] Todo todo)
        {
            var existingTodo = await _context.Todos.FindAsync(id);

            if (existingTodo == null)
            {
                return NotFound(new { message = "Todo not found" });
            }

            existingTodo.IsCompleted = todo.IsCompleted;

            await _context.SaveChangesAsync();

            return Ok(existingTodo);
        }

        // DELETE: api/todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound(new { message = "Todo not found" });
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Todo deleted successfully" });
        }
    }
}