using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using DrivingSchoolManager.Data.Entities.Models;
using Jose;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DrivingSchoolManager.Domain.Helpers
{
    public class JwtHelper
    {
        public JwtHelper(IConfiguration configuration)
        {
            _issuer = configuration["JWT:Issuer"];
            _audienceId = configuration["JWT:AudienceId"];
            _secret = Encoding.UTF8.GetBytes(configuration["JWT:AudienceSecret"]);
        }

        private readonly string _issuer;
        private readonly string _audienceId;
        private readonly byte[] _secret;
        public string GetJwtToken(User userToGenerateFor)
        {
            var currentSeconds = Math.Round(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds);
            var payload = new Dictionary<string, string>
            {
                {"iss", _issuer},
                {"aud", _audienceId},
                {"exp", (currentSeconds + 300).ToString(CultureInfo.InvariantCulture)},
                {"drivingSchoolId", userToGenerateFor.DrivingSchoolId.ToString()},
                {"userId", userToGenerateFor.Id.ToString()},
                {"roles", userToGenerateFor.Role.ToString()},
                {"email", $"{userToGenerateFor.Email}"}
            };

            return JWT.Encode(payload, _secret, JwsAlgorithm.HS256);
        }

        public int GetUserIdFromToken(string token)
        {
            var decodedJObjectToken = (JObject)JsonConvert.DeserializeObject(JWT.Decode(token, _secret));
            var didParsingSucceed = int.TryParse(decodedJObjectToken["userId"].ToString(), out var userId);
            return didParsingSucceed ? userId : 0;
        }

        public int GetDrivingSchoolIdFromToken(string token)
        {
            var decodedJObjectToken = (JObject)JsonConvert.DeserializeObject(JWT.Decode(token, _secret));
            var didParsingSucceed = int.TryParse(decodedJObjectToken["drivingSchoolId"].ToString(), out var userId);
            return didParsingSucceed ? userId : 0;
        }

        public string GetNewToken(string existingToken)
        {
            var decodedToken = JWT.Decode(existingToken, _secret);
            var decodedJObjectToken = (JObject)JsonConvert.DeserializeObject(decodedToken);
            var currentSeconds = Math.Round(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds);
            var expiryTime = decodedJObjectToken["exp"].ToObject<double>();

            if (currentSeconds - expiryTime > 86400)
                return null;

            var payload = new Dictionary<string, string>
            {
                {"iss", decodedJObjectToken["iss"].ToString()},
                {"aud", decodedJObjectToken["aud"].ToString()},
                {"exp", (currentSeconds + 300).ToString(CultureInfo.InvariantCulture)},
                {"drivingSchoolId", decodedJObjectToken["drivingSchoolId"].ToString()},
                {"userId", decodedJObjectToken["userId"].ToString()},
                {"roles", decodedJObjectToken["roles"].ToString()},
                {"email", decodedJObjectToken["email"].ToString()}
            };

            return JWT.Encode(payload, _secret, JwsAlgorithm.HS256);
        }
    }
}