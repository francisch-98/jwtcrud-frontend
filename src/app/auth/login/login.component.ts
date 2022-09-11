import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser!: LoginUser;
  nameUser: string = "";
  password: string = "";
  role: string[] = [];
  errMsj: string = "";

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.role = this.tokenService.getAuthorities();
    }
  }
  onLogin(): void {
    this.loginUser = new LoginUser(this.nameUser, this.password);
    this.authService.login(this.loginUser).subscribe({
      next: (data) => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setNameUser(data.NameUser);
        this.tokenService.setAuthorities(data.authorities);
        this.role = data.authorities;
        this.toastr.success('Bienvenido ' + data.NameUser, 'OK', {
          timeOut: 3000, positionClass: 'toast-center-center'
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000, positionClass: 'toast-center-center',
        });
        console.log(err.error.message);
      }
    }
    );
  }
}
