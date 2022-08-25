import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/Models/Vehicle';
import { VehiclesService } from 'src/app/Service/vehicles.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  vehicles:Vehicle[];

  constructor(public _vehicles:VehiclesService, private _router:Router) { }

  ngOnInit(): void {
    this.load();

  }

  load(){
    this._vehicles.getAllVehicles().subscribe(unpackedVehicles => this.vehicles = unpackedVehicles,null,()=>{
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

  print(){
    console.log(this.vehicles)
  }

  remove(vic:number){
    if (confirm("Are you sure you want to delete this vehicle")) {
      this.vehicles.splice(vic,1)
    }else{
    }
  }

  newVic(){
    this.vehicles.push({
      registration:'',
      type:'',
      contract:'',
      location:'',
      config:'',
      timeToReady:-1,
      mr:'',
      maintenance:'',
      notes:'',
      statusColour:'',
      hoursShown:true
    })
  }

  save(){
    console.log(this.vehicles)
    this._vehicles.postVehicles(this.vehicles).subscribe(unpacked=>this.vehicles = unpacked,null,()=>{
      console.log(this.vehicles)
    });
  }

  return(){
    if(confirm("Unsaved progress will be lost")){
      this._router.navigate(['/']);
    }

  }
}
