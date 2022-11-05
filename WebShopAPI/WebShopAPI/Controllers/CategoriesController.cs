using AutoMapper;
using LibData;
using LibData.Entities;
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

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] CategoryCreateViewModel model)
        {
            string fileName = string.Empty;
            if(model.Image!=null)
            {
                var fileExp = Path.GetFileName(model.Image.FileName);
                var dirPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                fileName = Path.GetRandomFileName() + fileExp;
                using(var stream = System.IO.File.Create(Path.Combine(dirPath, fileName)))
                {
                    await model.Image.CopyToAsync(stream);
                }    
            }
            CategoryEntity category = new CategoryEntity
            {
                Name=model.Name,
                Image=fileName,
                DateCreated= DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)
            };
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok();
        }
    }
}
