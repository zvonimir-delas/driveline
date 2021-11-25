using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace DrivingSchoolManager.Domain.Classes
{
    public class FileInputModel
    {
        public string AlphanumerincFormData { get; set; }
        public IFormFile FileToUpload { get; set; }
    }

    public class BlobStorageConfig
    {
        public string ConnectionString { get; set; }
    }
}
