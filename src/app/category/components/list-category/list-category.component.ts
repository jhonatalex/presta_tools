import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../providers/category.service';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[] = [];
  pagedCategories: Category[] = [];
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  sortColumn = 'idCat' as keyof Category;
  sortDirection = 'asc' as 'asc' | 'desc';

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getListCategoryProviders().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        this.applyFilters();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  deleteCategory(categoryId: number) {

    /*
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        // Actualizar la lista de categorías después de eliminar
        this.loadCategories();
      },
      (error) => {
        console.log(error);
      }
    );

      */
  }



  onSort(event: any) {
    this.sortColumn = event.column.prop;
    this.sortDirection = event.newValue;
    this.applyFilters();
  }

  applyFilters() {
    let filteredCategories = this.categories;

    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredCategories = filteredCategories.filter(
        (category: Category) =>
          category.titleCat.toLowerCase().includes(searchTermLower) ||
          category.descripCat.toLowerCase().includes(searchTermLower)
      );
    }

    if (this.sortColumn && this.sortDirection) {
      filteredCategories = filteredCategories.sort((a, b) => {
        const valA = a[this.sortColumn];
        const valB = b[this.sortColumn];

        if (valA < valB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valA > valB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedCategories = filteredCategories.slice(startIndex, startIndex + this.pageSize);
  }


}
