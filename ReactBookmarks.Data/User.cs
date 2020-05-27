using System;
using System.Collections.Generic;

namespace ReactBookmarks.Data
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public List<Bookmark> Bookmarks { get; set; }

    }
}
