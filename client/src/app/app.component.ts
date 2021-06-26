import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'web422-a6';
  searchString:string;
  public token: any;

  constructor(private router: Router, private auth:AuthService){}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch(){
    this.router.navigate(['/search'],{queryParams:{q:this.searchString}});
    console.log('searchString', this.searchString)
    this.searchString = "";
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
