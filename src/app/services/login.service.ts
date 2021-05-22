import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})

//Hacemos la implementacio de nuestro servicio web
export class LoginService {

  //Inyectamos http
  constructor(private http: HttpClient) { }

  //Generamos un metodo que recibe una variable de tipo de nuestra interfaz
  login(data : LoginRequest): Observable<LoginResponse>{

    //<Tipo de retorno>
    return this.http.post<LoginResponse>('https://reqres.in/api/login', data)
  }
}
