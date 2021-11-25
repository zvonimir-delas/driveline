using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DrivingSchoolManager.Domain.Helpers
{
    public class PushNotificationHelper
    {
        private readonly string _serverKey;
        private readonly string _senderId;
        public PushNotificationHelper(IConfiguration configuration)
        {
            _serverKey = configuration["Firebase:ServerKey"];
            _senderId = configuration["Firebase:SenderId"];
        }
        public async void NotifyAsync(string? targetDeviceToken, string notificationTitle, string notificationBody)
        {
            if (targetDeviceToken == null)
                return;

            try
            {
                var serverKey = string.Format("key={0}", _serverKey);
                var senderId = string.Format("id={0}", _senderId);

                var notificationData = new
                {
                    to=targetDeviceToken,
                    notification = new { title=notificationTitle, body=notificationBody }
                };

                var jsonBody = JsonConvert.SerializeObject(notificationData);

                using var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://fcm.googleapis.com/fcm/send");
                httpRequest.Headers.TryAddWithoutValidation("Authorization", serverKey);
                httpRequest.Headers.TryAddWithoutValidation("Sender", senderId);
                httpRequest.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                using var httpClient = new HttpClient();
                var result = await httpClient.SendAsync(httpRequest);

                if (!result.IsSuccessStatusCode)
                {
                    //log
                }
            }
            catch (Exception exceptionInfo)
            {
                
            }
        }
    }
}
