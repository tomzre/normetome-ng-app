import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ToastsManager } from 'ng2-toastr';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categories: any[];
  constructor(private service: CategoriesService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(categories => this.categories = categories,
        (error: AppError) => {
          //this.toastr.error('An error has occured', 'Oops!');
          console.log(error);
        });
  }

  onCreate(input: HTMLInputElement) {
    let category = {categoryName: input.value}
    let command = {
      category: {
        categoryName: category.categoryName
      }
    }
    this.categories.push(category);
    
    this.service.create(command)
      .subscribe(newCategory => {
        category['id'] = newCategory.Id;
        this.toastr.info('Category has been added');
      },
    (error: AppError) => {
      this.toastr.error('Something went wrong!', "Oops! :/");
    });
    input.value = "";
  }

  remove(category){
    let index = this.categories.indexOf(category);
    let name = category.categoryName;

    if (confirm("Are you sure to delete " + name)){
      this.categories.splice(index, 1);
      this.service.delete(category.id)
        .subscribe(() =>{
          this.toastr.warning('Category ' + name +' has been deleted');
        },
      (error: AppError) => {
        this.categories.splice(index, 0, category);

        if (error instanceof NotFoundError)
        this.toastr.error("This category has been already deleted.", "Oops!");
      else
        throw error;
      });
    }
  }
}
