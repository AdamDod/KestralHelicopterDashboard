import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Vehicle } from 'src/app/Models/Vehicle';
import { VehiclesService } from 'src/app/Service/vehicles.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles:Vehicle[];
  hubConnection: signalR.HubConnection;

  constructor(public _vehicles:VehiclesService) { }

  ngOnInit(): void {
    this.load();
    this.startConnection();
    this.addCellChangeListener();
    setInterval(()=> { this.restartConnection() },  20000);
  }

  load(){
    this._vehicles.getAllVehicles().subscribe(unpackedVehicles => this.vehicles = unpackedVehicles,null,()=>{
    });

  }

  restartConnection(){
    this.load();
    this.hubConnection.stop();
    this.startConnection();
    this.addCellChangeListener();
  }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://kestrelmaintenanceapi.azurewebsites.net/hub',{skipNegotiation:true,transport: signalR.HttpTransportType.WebSockets})
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };



  addCellChangeListener = () => {
    this.hubConnection.on('update', (data) => {
      this.vehicles = data;
    });
  };

}
