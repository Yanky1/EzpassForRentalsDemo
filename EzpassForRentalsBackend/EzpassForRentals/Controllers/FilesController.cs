using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.Extensions.Configuration;

namespace EzpassForRentals.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        IConfiguration configuration;
        public FilesController(IConfiguration iconfiguration)
        {
            configuration = iconfiguration;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];

                string storageConnectionString = configuration.GetConnectionString("StorageConnectionString");
                // Retrieve storage account from connection string.
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);

                // Create the blob client.
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

                // Retrieve reference to a previously created container.
                CloudBlobContainer container = blobClient.GetContainerReference("filescontainer");

                // Retrieve reference to a blob named "myblob".
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(file.FileName);

                // Create or overwrite the "myblob" blob with contents from a local file.

              
                using  (var fileStream = file.OpenReadStream())
                {
                  await  blockBlob.UploadFromStreamAsync(fileStream);

                    return Ok();
                }


                

            }
            catch (Exception)
            {

                throw;
            }

        }


        [HttpGet("{filename}")]
        public async Task<IActionResult> GetFile([FromRoute] string filename)
        {
            string storageConnectionString = configuration.GetConnectionString("StorageConnectionString");

            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            // Create the blob client.
             CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            CloudBlobContainer container = blobClient.GetContainerReference("filescontainer");

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(filename);

            var stream = await blockBlob.OpenReadAsync();



            return File(stream, blockBlob.Properties.ContentType);
        }


        [HttpGet]
        public async Task<List<string>> GetFileNames()
        {
            string storageConnectionString = configuration.GetConnectionString("StorageConnectionString");


            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.GetContainerReference("filescontainer");

            BlobResultSegment blobs = await container.ListBlobsSegmentedAsync(null);
            List<IListBlobItem> list = new List<IListBlobItem>();
            list.AddRange(blobs.Results);

            while (blobs.ContinuationToken != null)
            {
                blobs = await container.ListBlobsSegmentedAsync(blobs.ContinuationToken);
                list.AddRange(blobs.Results);
            }

           // List<string> nameList = new List<string>();

            List<string> nameList = list.Select(blob => blob.Uri.Segments.Last()).ToList();

            return nameList;
        }
    }
}
