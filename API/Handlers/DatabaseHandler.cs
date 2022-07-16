
using System;
using System.Data.SqlClient;

namespace API.Handlers
{
    public abstract class DatabaseHandler
    {
        public static string GetConnectionString()
        {
            try
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "kestral.database.windows.net";
                builder.UserID = "adamadmin";
                builder.Password = "Move1234!";
                builder.InitialCatalog = "KestralHelicopters"; //databsase name
                return builder.ConnectionString;
            }
            catch (Exception e)
            {
                throw new Exception("Error in GetConnectionString(): " + e.Message);
            }
        }
    }
}