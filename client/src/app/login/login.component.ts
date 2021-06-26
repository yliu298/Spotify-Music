import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public warning:string;
  public loading:boolean = false;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(f: NgForm): void{

    if(this.user.userName && this.user.password){
      this.loading = true;

      this.auth.login(this.user).subscribe(
        (success)=>{
          console.log("login in successful")
          this.loading = false;
          localStorage.setItem('access_token', success.token);
          this.router.navigate(['/newReleases']);
        },
        (err)=>{
          this.warning = err.error.message;
          this.loading = false;
        }
      )
    }
    
  }

}
