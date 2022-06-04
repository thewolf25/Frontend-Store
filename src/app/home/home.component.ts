import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategory("/categories").subscribe(
      (s)=> {this.categories = s["_embedded"]["categories"];
    },
    (err)=>{
        console.log(err )
    }
    )}
    

}
