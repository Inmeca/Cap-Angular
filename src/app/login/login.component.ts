import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/login.model';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Vamos a casarla 
  formLogin: FormGroup = this.formBuilder.group({}); 
  disableButton = false;

  //Inyeccion de dependencia
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private dataService: DataService) {
    this.formLogin = this.formBuilder.group({

      //Variable de nuestro formulario, comienzan con un valor vacio
      // Validaciones que debe cumplir el campo
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading;

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

    console.log(data);

    this.dataService.isLoading.next(true)

    //eve.holt@reqres.in
    //Nos regresa la contruccion de nuestro servicio
    this.loginService.login(data).subscribe((res) => {

      //Funcion asincrona
      //Se ejecuta una ves que termine la petición http
      console.log(res);
      this.dataService.isLoading.next(false)
      this.router.navigate(['home']);
    
    }, (err) => {
      console.log("Error: ", err)
      this.dataService.isLoading.next(false)
      this.dataService.message.next(err.error.error)
    });

  }

}
