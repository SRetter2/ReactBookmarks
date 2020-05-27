using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ReactBookmarks.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;
        public BookmarkRepository(string conn)
        {
            _connectionString = conn;
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using (var cxt = new UserBookmarkContext(_connectionString))
            {
                cxt.Bookmarks.Add(bookmark);
                cxt.SaveChanges();
            }
        }
        public User GetUsersBookmarks(int userId)
        {
            using (var cxt = new UserBookmarkContext(_connectionString))
            {
                return cxt.Users.Include(u => u.Bookmarks).FirstOrDefault(u => u.Id == userId);
            }
        }
        public void EditBookmark(Bookmark bookmark)
        {
            using(var cxt = new UserBookmarkContext(_connectionString))
            {
                cxt.Bookmarks.Attach(bookmark);
                cxt.Entry(bookmark).State = EntityState.Modified;
                cxt.SaveChanges();
            }
        }
        public void DeleteBookmark(int bookmarkId)
        {
            using(var cxt = new UserBookmarkContext(_connectionString))
            {
                cxt.Database.ExecuteSqlCommand(
                    "DELETE FROM Bookmarks WHERE Id = @id",
                    new SqlParameter("@id", bookmarkId));
            }
        }

        private List<Top5Bookmarks> result = new List<Top5Bookmarks>();
        public List<Top5Bookmarks> GetTop5Bookmarks()
        {
            using (var cxt = new UserBookmarkContext(_connectionString))
            {
                foreach (Bookmark bookmark in cxt.Bookmarks)
                {
                    var inList = IsInList(result, bookmark.Title);
                    if (!inList)
                    {
                        result.Add(new Top5Bookmarks
                        {
                            Amount = cxt.Bookmarks.Count(b => b.Title == bookmark.Title),
                            Bookmark = bookmark
                        });
                    }                    
                }
                return result.OrderByDescending(r => r.Amount).Take(5).ToList();
            }
        }
        private bool IsInList(List<Top5Bookmarks> list, string title)
        {
            foreach(Top5Bookmarks bookmark in list)
            {
                if(bookmark.Bookmark.Title == title)
                {
                    return true;
                }
            }
            return false;
        }
       
    }

    
}
