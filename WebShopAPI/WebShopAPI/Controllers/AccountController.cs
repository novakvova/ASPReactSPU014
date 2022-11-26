using LibData.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebShopAPI.Contants;
using WebShopAPI.Models;
using WebShopAPI.Services;

namespace WebShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IJwtTokenService _jwtTokenService;
        private readonly UserManager<UserEntity> _userManager;

        public AccountController(IJwtTokenService jwtTokenService, UserManager<UserEntity> userManager)
        {
            _jwtTokenService = jwtTokenService;
            _userManager = userManager;
        }
        [HttpPost("login")]
        public async Task<IActionResult> login([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest(new { error = "Дані вказно не вірно!"});
            if (await _userManager.CheckPasswordAsync(user, model.Password))
            {
                string token = await _jwtTokenService.GenerateTokenAsync(user);
                return Ok(new { token });
            }
            return BadRequest(new { error = "Дані вказно не вірно!" });
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
                return BadRequest(new { error = "Користувач уже зареєстровано" });
            try
            {
                string fileName = string.Empty;
                if (model.Image != null)
                {
                    var fileExp = Path.GetFileName(model.Image.FileName);
                    var dirPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                    fileName = Path.GetRandomFileName() + fileExp;
                    using (var stream = System.IO.File.Create(Path.Combine(dirPath, fileName)))
                    {
                        await model.Image.CopyToAsync(stream);
                    }
                }
                user = new UserEntity
                {
                    Email = model.Email,
                    UserName = model.Email,
                    PhoneNumber = model.Phone,
                    FirstName = model.FistName,
                    SecondName = model.LastName,
                    Image = fileName
                };

                var result = _userManager.CreateAsync(user, model.Password).Result;

                if (result.Succeeded)
                {
                    result = _userManager.AddToRoleAsync(user, Roles.User).Result;
                }

                string token = await _jwtTokenService.GenerateTokenAsync(user);
                return Ok(new { token });
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
