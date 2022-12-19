import { Component, OnInit } from '@angular/core';
import { InterceptorService } from './shared/services/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   constructor(private interceptor: InterceptorService){}

   isLoading(): boolean
   {
     return this.interceptor.isRequestInProgress();
   }
   
}
