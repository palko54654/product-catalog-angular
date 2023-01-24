import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categoriesList:any;
  @Input() onCategoryClick: (event: Event ,categoryId?: string ) => void = () => {};
  constructor() {}
  
  ngOnInit(): void {}
}
