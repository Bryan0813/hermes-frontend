import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { CategoryServiceModel } from '../../shared/models';
import { CategoryServiceService } from '../../shared/services/modules/category-service.service';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { CategoryServiceFormModule } from '../../shared/components/modules';

@Component({
  selector: 'app-category-service',
  standalone: false,
  templateUrl: './category-service.component.html',
  styleUrl: './category-service.component.scss',
})
export class CategoryServiceComponent {
  //#region variables
  popupVisible = false; // Variable para controlar la visibilidad del popup
  categoryService: CategoryServiceModel = new CategoryServiceModel(); // Categoría individual
  categoryServices: CategoryServiceModel[] = []; // Array de todas las categorías
  //#endregion

  //#region constructor e init
  constructor(private categoryServiceService: CategoryServiceService) {
    this.deleteCategoryService = this.deleteCategoryService.bind(this);
    this.editCategoryService = this.editCategoryService.bind(this);
  }

  ngOnInit(): void {
    this.getAllCategories();
  }
  //#endregion

  //#region metodos & servicios
  // Método para cargar todas las categorías
  getAllCategories() {
    this.categoryServiceService.getAll().subscribe((categories) => {
      if (categories) this.categoryServices = categories;
    });
  }

  // Método para guardar una categoría
  saveCategoryService(category: CategoryServiceModel) {
    if (category.id) {
      // Actualizar categoría existente
      this.categoryServiceService.update(category).subscribe({
        next: () => {
          this.getAllCategories(); // Recargar categorías
          this.popupVisible = false; // Cerrar el popup
          this.categoryService = new CategoryServiceModel(); // Reiniciar la categoría
        },
        error: (err) => console.error(err.error.message),
      });
    } else {
      // Crear nueva categoría
      this.categoryServiceService.create(category).subscribe({
        next: () => {
          this.getAllCategories(); // Recargar categorías
          this.popupVisible = false; // Cerrar el popup
          this.categoryService = new CategoryServiceModel(); // Reiniciar la categoría
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }

  // Método para editar una categoría
  editCategoryService($event: any): void {
    const id = $event.row.key;
    if (!id) {
      console.error('No se pudo obtener el ID de la categoría.');
      return;
    }
    this.categoryServiceService.getById(id).subscribe({
      next: (categoryFound) => {
        this.categoryService = categoryFound;
        this.showPopup();
      },
      error: (err) => console.error(err.error.message),
    });
  }

  // Método para eliminar una categoría
  deleteCategoryService($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID de la categoría.');
      return;
    }

    const confirmDelete = confirm(
      '¿Estás seguro de que deseas eliminar esta categoría?'
    );

    if (confirmDelete) {
      this.categoryServiceService.delete(id).subscribe({
        next: () => {
          this.getAllCategories();
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }
  //#endregion

  //#region Eventos
  // Métodos para el popup
  showPopup() {
    this.popupVisible = false; // Asegúrate de que el estado sea false antes de abrir
    setTimeout(() => {
      this.popupVisible = true; // Cambia el estado a true para abrir el popup
    }, 0); // Usa un pequeño retraso para forzar la detección de cambios
  }

  closePopup() {
    this.categoryService = new CategoryServiceModel(); // Reiniciar la categoría
    this.popupVisible = false; // Cerrar el popup
  }
  //#endregion
}

//#region module
@NgModule({
  declarations: [CategoryServiceComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    PopupModule,
    CategoryServiceFormModule,
  ],
  exports: [CategoryServiceComponent],
})
export class CategoryServiceModule { }
//#endregion
