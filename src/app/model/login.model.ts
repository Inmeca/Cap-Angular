//Definimos como el json va a estar coformado
//Para que haga match con lo que teneos que enviar


export interface LoginRequest{
    email : string;
    password: string
}

//Respuesta del servidor
export interface LoginResponse{
    token: string
}