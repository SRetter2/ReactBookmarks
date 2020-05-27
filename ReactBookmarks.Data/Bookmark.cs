using System;
using System.Collections.Generic;
using System.Text;

namespace ReactBookmarks.Data
{
   public class Bookmark
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string URL { get; set; }
        public int UserId { get; set; }

    }
}
