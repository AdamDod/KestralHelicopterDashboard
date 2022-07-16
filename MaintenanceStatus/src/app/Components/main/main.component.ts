import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/Models/Vehicle';
import { VehiclesService } from 'src/app/Service/vehicles.service';
import * as signalR from '@microsoft/signalr';




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
  scroll:boolean = false;
  canStop:boolean = false;


  constructor(public _vehicles:VehiclesService, private _router:Router) {
    this.xpixl = 0;
    setInterval(()=> { this.winScroll() },  2000);
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

  backgroundColour(time:number):string{
    if (time == -1) {
      return 'red';
    }
    if(time == 0){
      return 'green';
    }
    if(time >0){
      return 'yellow'
    }else{
      return 'purple'
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
