using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Handlers
{
    public class VehicleHandler : DatabaseHandler
    {
        public IEnumerable<Vehicle> GetVehicles()
        {
            List<Vehicle> Vehicles = new List<Vehicle>();
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand("SELECT * FROM [Vehicle]", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {                              
                            Vehicles.Add(new Vehicle(){
                                Registration= reader.GetString(1),
                                Type = reader.GetString(2),
                                Contract = reader.GetString(3),
                                Location = reader.GetString(4),
                                Config = reader.GetString(5),
                                TimeToReady = reader.GetInt32(6),
                                MR = reader.GetString(7),
                                Maintenance = reader.GetString(8),
                                Notes = reader.GetString(9),
                            });  
                        }
                        conn.Close();
                        if (Vehicles.Count ==0)
                        {   
                            return null;
                        }else{
                            return Vehicles;
                        }
                        
                    }
                }
            }
        } 

        public IEnumerable<Vehicle> PostVehicles(Vehicle[] vic, IHubContext<CellHub> _hub){

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand($"DELETE [Vehicle] FROM [Vehicle]", conn))
                {
                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }

            foreach (var v in vic)
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                conn.Open();
                using (SqlCommand command = new SqlCommand("ADD_Vehicle", conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@pRegistration", v.Registration);
                    command.Parameters.AddWithValue("@pType", v.Type);
                    command.Parameters.AddWithValue("@pContract", v.Contract);
                    command.Parameters.AddWithValue("@pLocation", v.Location);
                    command.Parameters.AddWithValue("@pConfig", v.Config);
                    command.Parameters.AddWithValue("@pTimeToReady", v.TimeToReady);
                    command.Parameters.AddWithValue("@pMR", v.MR);
                    command.Parameters.AddWithValue("@pMaintenance", v.Maintenance);
                    command.Parameters.AddWithValue("@pNotes", v.Notes);

                    command.ExecuteNonQuery();
                    conn.Close();
                }
                }
            }
            _hub.Clients.All.SendAsync("update", vic);
            return vic;
        }      
    }
}
