import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Movie } from '../model/movie.model';
import { DataService } from '../services/data.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource<Movie>();
  columns = ['name', 'category', 'duration', 'actions', 'delete'];
  disableButton = false;

  constructor(private dataService: DataService, private movie: MovieService, private router: Router) { 
    this.loadData();

  }

  ngOnInit(): void {
  }

  loadData(){
    this.dataService.isLoading.next(true);
    this.movie.getMovie().subscribe(movie => {
      this.dataSource.data = movie;
      this.dataService.isLoading.next(false);
    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next("Lo sentimos, no se pudieron cargar los elementos");
    });

    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading;
    });
  }

  edit(item: Movie): void{
    console.log("Dato: " +  item._id);
    //Redireccion
    this.router.navigate(['movie', item._id]); //item._id
  }

  newItem(): void{
    this.router.navigate(['movie']);
    //this.dataService.isLoading.next(true);
  }

  deletItem(item: Movie): void{
    console.log("Pelicula a eliminar: " + item.name);
    //this.disableButton = true;
    this.dataService.isLoading.next(true);
    this.router.navigate(['movie', item._id, "delete"]);  
  }

}
