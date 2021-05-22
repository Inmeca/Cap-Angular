import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../model/movie.model';
import { DataService } from '../services/data.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  formMovie: FormGroup = this.formBuilder.group({});
  disableButton = false;
  
  id : string = '';
  delete : string = "";
  title = "Crear elemento";
  statusDelete = "";

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private movie: MovieService, private activeteRoute: ActivatedRoute) { 
    this.formMovie = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      duration: ['', Validators.required],
    });

    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading;
    });

    this.activeteRoute.params.subscribe(parameters => {

      if(parameters.id){

        this.dataService.isLoading.next(true);
        this.id = parameters.id;
        
        if(parameters.delete){
          this.delete = parameters.delete;
          this.movie.deleteMovie(parameters.id).subscribe({next: data =>{
            this.statusDelete = "Eliminación correcta";
            this.dataService.message.next( this.statusDelete); 
          },
          error: error =>{
            this.statusDelete = error.message;
            this.dataService.message.next( this.statusDelete);
          }
        });

          this.router.navigate(['home']);
        }

        else{
          this.title = "Actualizar elemento";
          this.movie.getSingleMovie(parameters.id).subscribe(item => {
            //this.formMovie.get('name')?.setValue(item.name);
            //this.formMovie.get('category')?.setValue(item.category);
            //this.formMovie.get('duration')?.setValue(item.duration);
  
            //Utilizar siempre y cuando los formularios tengan el mismo nombre que los inputs
            this.formMovie.patchValue(item);
  
          });
        }
        this.dataService.isLoading.next(false);
      }
    });

  }

  ngOnInit(): void {
  }

  save(): void{
    const data={
      name : this.formMovie.get('name')?.value,
      category : this.formMovie.get('category')?.value,
      duration : this.formMovie.get('duration')?.value,
    }as Movie;

    console.log(data);

    this.dataService.isLoading.next(true);

    this.movie.saveMovie(data, this.id).subscribe(() => {
      this.dataService.isLoading.next(false);
      this.router.navigate(['home']);
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next("Lo sentimos, no se pudieron cargar los elementos")
    });
  }
}
