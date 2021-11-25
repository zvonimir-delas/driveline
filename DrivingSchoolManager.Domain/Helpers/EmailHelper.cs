using System;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace DrivingSchoolManager.Domain.Helpers
{
    public class EmailHelper
    {
        public EmailHelper(IConfiguration configuration)
        {
            _smtpClient = new SmtpClient
            {
                Host = configuration["SMTP:SmtpServer"],
                Port = int.Parse(configuration["SMTP:SmtpPort"]),
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(configuration["SMTP:SmtpUsername"], configuration["SMTP:SmtpPassword"], configuration["SMTP:SmtpServer"]),
                EnableSsl = true
            };
        }
        private readonly SmtpClient _smtpClient;

        public void SendEmail(MailMessage message, bool addAutomaticReplyInfoSignature = true)
        {
            message.From = new MailAddress("driveline-np@outlook.com", "Driveline");
            if (addAutomaticReplyInfoSignature)
                message.Body +=
                    "<br><br><i>This is an automatically generated email." +
                    "Please do not reply to this address.";
            message.BodyEncoding = System.Text.Encoding.UTF8;
            message.IsBodyHtml = true;
            try
            {
                _smtpClient.Send(message);
            }
            catch (Exception ex)
            {
                ;
            }
        }

        public bool ValidateEmail(string emailAddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailAddress);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}