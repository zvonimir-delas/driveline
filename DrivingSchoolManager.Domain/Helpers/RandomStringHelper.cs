using System.Security.Cryptography;
using System.Text;

namespace DrivingSchoolManager.Domain.Helpers
{
    public static class RandomStringHelper
    {
        public static readonly char[] Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
        public static string GenerateRandomString(int size)
        {
            var data = new byte[size];
            using (var crypto = new RNGCryptoServiceProvider())
                crypto.GetBytes(data);

            var result = new StringBuilder(size);
            foreach (var b in data)
                result.Append(Chars[b % Chars.Length]);

            return result.ToString();
        }
    }
}