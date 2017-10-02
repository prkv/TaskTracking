import { Component } from "@angular/core"
import { VERSION } from '@angular/core'
@Component({
     selector: "user-app",
     template: `
                <div>
                <app-header></app-header>
              <div class='container'>
                <router-outlet></router-outlet>
              </div>
             </div>          
`
})

export class AppComponent {

    ngOnInit(): void {
        console.log(VERSION.full);
    }

}