import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/Models/Vehicle';
import { VehiclesService } from 'src/app/Service/vehicles.service';
import * as signalR from '@microsoft/signalr';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  vehicles:Vehicle[];
  pin:string = '';
  hubConnection: signalR.HubConnection;
  xpixl:number;
  timeoutID:any;
  screenHeight:any;
  scroll:boolean = true;
  canStop:boolean = false;


  constructor(public _vehicles:VehiclesService, private _router:Router,@Inject(DOCUMENT) public document: Document, public auth: AuthService) {
    this.xpixl = 0;
    setInterval(()=> { this.winScroll() },  4000);
    setInterval(()=> { this.restartConnection() },  20000);
   }

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.startConnection();
    this.addCellChangeListener();
    this.load()
  }

  @HostListener('document:click',['$event'])
  documentClick(event:MouseEvent){
    if (this.canStop == true) {
      this.scroll = false;
      this.canStop = false;
    }
  }

  restartConnection(){
    this.load();
    this.hubConnection.stop();
    this.startConnection();
    this.addCellChangeListener();
  }

  load(){
    this._vehicles.getAllVehicles().subscribe(unpackedVehicles => this.vehicles = unpackedVehicles,null,()=>{
      this.screenHeight = window.innerHeight;
    });
  }

  timeToReady(time:number):string{
    if(time == -1){
      return ''
    }else{
      return time.toString() + '- Hours';
    }
  }

  navToEdit(){
    if (this.pin != '') {
      if (this.pin == '2468') {
        this._router.navigate(['/edit'])
      }else{
        confirm("Incorrect Pin")
      }
    }else{
      confirm("Please Enter Pin")
    }
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

  winScroll(){
    if (this.scroll) {
      this.canStop = true;
      window.scroll({
        top: this.xpixl,
        behavior: 'smooth'
      });
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.xpixl = 0;
      }else{
        this.xpixl += 200;
      }
    }

  }
}
