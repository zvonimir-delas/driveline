using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class FileUploadRepository : IFileUploadRepository
    {
        private readonly IOptions<BlobStorageConfig> _blobStorageConfig;
        public FileUploadRepository(IOptions<BlobStorageConfig> blobStorageConfig)
        {
            _blobStorageConfig = blobStorageConfig;
            _blobStorageConfig.Value.ConnectionString = "UseDevelopmentStorage=true";
        }
        public async Task<string> UploadImage(IFormFile file, string fileName, string containerName)
        {
            var container = GetBlobContainer(containerName);

            // Get a reference to a blob named "myblob".
            var blockBlob = container.GetBlockBlobReference(fileName);

            using (var stream = file.OpenReadStream())
            {
                await blockBlob.UploadFromStreamAsync(stream);
            }

            return blockBlob.Uri.AbsoluteUri;
        }

        public CloudBlobContainer GetBlobContainer(string containerName)
        {
            var blobStorageConnectionString = _blobStorageConfig.Value.ConnectionString;
            var blobStorageContainerName = containerName;

            var blobStorageAccount = CloudStorageAccount.Parse(blobStorageConnectionString);
            var blobClient = blobStorageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference(blobStorageContainerName);
            container.CreateIfNotExistsAsync();

            container.SetPermissionsAsync(
                new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            return container;
        }
    }
}
