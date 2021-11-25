using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage.Blob;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface IFileUploadRepository
    {
        Task<string> UploadImage(IFormFile file, string fileName, string containterName);
        CloudBlobContainer GetBlobContainer(string containerName);
    }
}
