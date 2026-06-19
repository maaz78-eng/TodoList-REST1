using Microsoft.EntityFrameworkCore;
using APIDemoApp.Models;

namespace APIDemoApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Todo> Todos { get; set; }
    }
}
