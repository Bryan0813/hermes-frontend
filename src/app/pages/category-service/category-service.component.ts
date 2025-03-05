import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
} from 'devextreme-angular';
import { CategoryService } from '../../shared/models';
import { CategoryServiceService } from '../../shared/services/modules';
@Component({
  selector: 'app-category-service',
  standalone: false,
  templateUrl: './category-service.component.html',
  styleUrl: './category-service.component.scss',
})
export class CategoryServiceComponent {
  popupVisible = false; //Variable para mostrar el popup
  categoryService: CategoryService = new CategoryService(); //Categoria individual
  categoryServices: CategoryService[] = []; //Array de todas las categorias

  //Constructor para agregar los servicios necesarios
  constructor(private categoryServiceService: CategoryServiceService) {}

  //Metodo para cargar cuando inicia la pagina
  ngOnInit(): void {
    this.loadCategorys();
  }

  //Metodo para cargar el popup
  showPopup() {
    this.popupVisible = !this.popupVisible;
  }

  //Metodo para cargar todas las categorias
  loadCategorys() {
    this.categoryServiceService.getAll().subscribe((data) => {
      if (data) this.categoryServices = data;
    });
  }

  //Metodo para cargar una categoria
  loadCategoryService(id: number) {
    this.categoryServiceService.getById(id).subscribe((data) => {
      this.categoryService = data;
    });
  }

  //Metodo para guardar una categoria
  saveCategoryService($event: any) {
    const id = $event.row.key;
    if (id === 0) {
      this.categoryServiceService
        .create(this.categoryService)
        .subscribe((created) => {
          if (created) this.loadCategorys();
        });
    } else {
      this.categoryServiceService.getById(id).subscribe((category) => {
        // if (category) //Cargar popup
      });
    }
    this.categoryService = new CategoryService();
  }

  //Metodo para eliminar una categoria
  deleteCategoryService($event: any) {
    const id = $event.row.key;
    // console.log(id);

    this.categoryServiceService.delete(id).subscribe((deleted) => {
      if (deleted) this.loadCategorys();
    });
  }
}
@NgModule({
  declarations: [CategoryServiceComponent],
  imports: [CommonModule, DxDataGridModule, DxButtonModule, DxFormModule],
  exports: [CategoryServiceComponent],
})
export class CategoryServiceModule {}
