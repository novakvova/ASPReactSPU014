using AutoMapper;
using LibData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebShopAPI.Models;

namespace WebShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;
        public UsersController(AppEFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = await _context.Users
                .Select(x => _mapper.Map<UserItemViewModel>(x))
                .ToListAsync();
            return Ok(model);
        }
    }
}
