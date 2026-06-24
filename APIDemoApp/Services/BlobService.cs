using Azure.Storage.Blobs;

namespace APIDemoApp.Services
{
    public class BlobService
    {
        private readonly string _connectionString;
        private readonly string _containerName = "todo-images";

        public BlobService(IConfiguration configuration)
        {
            _connectionString =
                configuration.GetConnectionString("AzureStorage");
        }

        public async Task<string> UploadAsync(IFormFile file)
        {
            var blobClient = new BlobContainerClient(
                _connectionString,
                _containerName);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

            var blob = blobClient.GetBlobClient(fileName);

            using var stream = file.OpenReadStream();

            await blob.UploadAsync(stream, overwrite: true);

            return blob.Uri.ToString();
        }
    }
}
