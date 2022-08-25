import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './Components/main/main.component';
import { HttpClientModule} from '@angular/common/http';
import { EditComponent } from './Components/edit/edit.component';
import { AuthModule } from '@auth0/auth0-angular';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EditComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'kestrelmaintenance.au.auth0.com',
      clientId: 'BahPNQeX0XhB33cCBnmhRt6ujsWUJHzw'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
