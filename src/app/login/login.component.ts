import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Vamos a casarla 
  formLogin: FormGroup = this.formBuilder.group({}); 

  constructor(private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({

      //Variable de nuestro formulario, comienzan con un valor vacio
      // Validaciones que debe cumplir el campo
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
  }

  login(): void{
    //console.log(this.formLogin?.errors)
    //debugger;

    //Aqui se almacen los datos de nuestro formulario
    const username = this.formLogin.get('username')?.value;
    const password = this.formLogin.get('password')?.value;

    const data = {
      email: username,
      password: password
    } as LoginRequest;

    console.log(data)
  }

}
