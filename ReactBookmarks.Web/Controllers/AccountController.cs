using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarks.Data;
using ReactBookmarks.Web.Models;

namespace ReactBookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;
        public AccountController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddUser(vm, vm.Password);
        }
        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(vm.Email, vm.Password);
            if(user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim("user", vm.Email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return user;
        }
        [HttpGet]
        [Route("getuser")]
        public User GetUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new UserRepository(_connectionString);
            return repo.GetUserByEmail(User.Identity.Name);
        }
        [HttpGet]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }
        [HttpGet]
        [Route("gettop5bookmarks")]
        public List<Top5Bookmarks> GetTop5Bookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTop5Bookmarks();
        }
    }
}