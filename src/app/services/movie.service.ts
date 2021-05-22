import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie.model'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovie(): Observable<[Movie]>{
    return this.http.get<[Movie]>('https://super-rest.herokuapp.com/test/movie');
  }

  getSingleMovie(id: string): Observable<Movie>{
    // https://super-rest.herokuapp.com/test/movie/ porque pasaremos un valor
    return this.http.get<Movie>('https://super-rest.herokuapp.com/test/movie/' + id);
  }

  saveMovie(item: Movie, id?: string): Observable<any>{
    if(id != ''){
      return this.http.put('https://super-rest.herokuapp.com/test/movie/'+ id, item);
    }

    return this.http.post('https://super-rest.herokuapp.com/test/movie', item);
  }

  deleteMovie(id: string):Observable<Movie>{
    return this.http.delete<Movie>('https://super-rest.herokuapp.com/test/movie/' + id);
  }

}
