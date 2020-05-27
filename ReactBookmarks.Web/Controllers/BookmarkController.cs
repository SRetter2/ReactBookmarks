using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarks.Data;

namespace ReactBookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;
        public BookmarkController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("addbookmark")]
        public void Addbookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            var repo2 = new UserRepository(_connectionString);
            var user =  repo2.GetUserByEmail(User.Identity.Name);
            bookmark.UserId = user.Id;
            repo.AddBookmark(bookmark);
        }
        [HttpPost]
        [Route("editbookmark")]
        public void Editbookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            var repo2 = new UserRepository(_connectionString);
            var user = repo2.GetUserByEmail(User.Identity.Name);
            bookmark.UserId = user.Id;
            repo.EditBookmark(bookmark);
        }
        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(bookmark.Id);
        }
        [HttpGet]
        [Route("getbookmarks")]
        public List<Bookmark> GetUsersBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            var repo2 = new UserRepository(_connectionString);
            var user = repo2.GetUserByEmail(User.Identity.Name);
            var result = repo.GetUsersBookmarks(user.Id);
            return result.Bookmarks;
        }
       
    }
}