import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser: RegisterUser;
  public warning: string;
  public success: boolean = false;
  public loading: boolean = false;

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.registerUser = new RegisterUser();
  }

  onSubmit(f: NgForm): void{
    

    if(this.registerUser.userName && this.registerUser.password === this.registerUser.password2){
      this.loading = true;
      console.log(this.registerUser)
      this.auth.register(this.registerUser).subscribe(
        (success)=>{
          this.success = true;
          this.warning = "";
          this.loading = false;
          
        },
        (err)=>{
          
          this.warning = err.error.message;
          this.success = false;
          this.loading = false;
        }
      )
    }else if(this.registerUser.password !== this.registerUser.password2){
      this.warning = "Passwords do not match"
    }

  }

}
