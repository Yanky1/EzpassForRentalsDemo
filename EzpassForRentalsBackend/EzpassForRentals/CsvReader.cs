using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;


namespace EzpassForRentals
{
    public class CsvReader
    {
        IConfiguration configuration;
        public CsvReader(IConfiguration iconfiguration)
        {
            configuration = iconfiguration;
        }
        public async Task<List<Transaction>> TransactionList(string csvFile)
        {

            var storageConnectionString = configuration.GetConnectionString("StorageConnectionString");
            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            CloudBlobContainer container = blobClient.GetContainerReference("filescontainer");

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(csvFile);

            var memStream = new MemoryStream();

            await blockBlob.DownloadToStreamAsync(memStream);

            memStream.Position = 0;

            List<Transaction> values = new List<Transaction>();

            string line;

            using (StreamReader reader = new StreamReader(memStream))
            {
                try
                {
                    while ((line = reader.ReadLine()) != null)
                    {

                        if (line.Contains("Prepaid Toll Payment") || line.Contains("AGENCY")) //to exclude non transaction lines
                        {
                            continue;
                        }

                        var eachTransaction = Transaction.FromCsv(line);
                        values.Add(eachTransaction);
                    }
                }
                catch (Exception)
                {

                    throw;
                }
                
                
            }
                                           

          return values;
        }
    }
    

    public class Transaction
    {
        public DateTime POSTINGDATE;
        public DateTime TRANSACTIONDATE;
        public string TAGPLATENUMBER;
        public string AGENCY;
        public string ACTIVITY;
        public string ENTRYTIME;
        public string ENTRYPLAZA;
        public string ENTRYLANE;
        public string EXITTIME;
        public string EXITPLAZA;
        public string EXITLANE;
        public string VEHICLETYPECODE;
        public string AMOUNT;
        public string PREPAID;
        public string PLANRATE;
        public string FARETYPE;
        public string BALANCE;

        public static Transaction FromCsv(string csvLine)
        {
            string[] values = csvLine.Split(',');

            Transaction transaction = new Transaction
            {
                POSTINGDATE = Convert.ToDateTime(values[0]),
                TRANSACTIONDATE = Convert.ToDateTime(values[1]),
                TAGPLATENUMBER = values[2],
                AGENCY = values[3],
                ACTIVITY = values[4],
                ENTRYTIME = values[5],
                ENTRYPLAZA = values[6],
                ENTRYLANE = values[7],
                EXITTIME = values[8],
                EXITPLAZA = values[9],
                EXITLANE = values[10],
                VEHICLETYPECODE = values[11],
                AMOUNT = values[12],
                PREPAID = values[13],
                PLANRATE = values[14],
                FARETYPE = values[15],
                BALANCE = values[16]
            };
            return transaction;
           
        }
    }
}

