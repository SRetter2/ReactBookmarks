using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBookmarks.Data
{
     public class UserRepository
    {
        private readonly string _connectionString;
        public UserRepository(string conn)
        {
            _connectionString = conn;
        }

        public void AddUser(User user, string password)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            using(var cxt = new UserBookmarkContext(_connectionString))
            {
                cxt.Users.Add(user);
                cxt.SaveChanges();
            }
        }
        public User GetUserByEmail(string email)
        {
            using(var cxt = new UserBookmarkContext(_connectionString))
            {
                return cxt.Users.FirstOrDefault(u => u.Email == email);
            }
        }
        public User Login( string email, string password)
        {
            var user = GetUserByEmail(email);
            if(user == null)
            {
                return null;
            }
            bool isCorrectPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (isCorrectPassword)
            {
                return user;
            }
            return null;
        }
    }
}
