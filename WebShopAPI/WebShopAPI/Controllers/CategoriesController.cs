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
    public class CategoriesController : ControllerBase
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;
        public CategoriesController(AppEFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = await _context.Categories
                .Select(x => _mapper.Map<CategoryItemViewModel>(x))
                .ToListAsync();
            return Ok(model);
        }
    }
}
