import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})


export class Login {

  loginForm = {
    email: '',
    password: ''
  };

  constructor(
  private router: Router
) {}

async login() {

  console.log(this.loginForm);

  try {

    const response = await fetch(
      'https://sm-backend-pi.vercel.app/login',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email: this.loginForm.email,
          password: this.loginForm.password
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.token) {

      localStorage.setItem(
        'token',
        data.token
      );

      this.router.navigate(['/dashboard']);

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

  }

}
}