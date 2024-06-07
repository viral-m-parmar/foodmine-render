import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  foods:Food[] = [];
 
  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute){
    
    let foodObservable:Observable<Food[]>
    activatedRoute.params.subscribe((params) => {
     
      if(params.searchTerm){
        foodObservable = this.foodService.getAllBySearchTerm(params.searchTerm);
      }
      else if(params.tag){
        foodObservable = this.foodService.getAllFoodByTag(params.tag);
      }
      else{
        foodObservable = foodService.getAll();
      }
    
      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })

    })
  
  }


}
