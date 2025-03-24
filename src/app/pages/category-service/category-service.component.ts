import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { CategoryServiceService } from '../../shared/services/modules/category-service.service';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { CategoryService } from '../../shared/models';
import { CategoryServiceFormModule } from '../../shared/components/modules';

@Component({
  selector: 'app-category-service',
  standalone: false,
  templateUrl: './category-service.component.html',
  styleUrl: './category-service.component.scss',
})
export class CategoryServiceComponent {
  popupVisible = false; // Variable para controlar la visibilidad del popup
  categoryService: CategoryService = new CategoryService(); // Categoría individual
  categoryServices: CategoryService[] = []; // Array de todas las categorías

  constructor(private categoryServiceService: CategoryServiceService) {
    this.deleteCategoryService = this.deleteCategoryService.bind(this);
    this.editCategoryService = this.editCategoryService.bind(this);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Método para mostrar el popup
  showPopup() {
    this.popupVisible = false; // Asegúrate de que el estado sea false antes de abrir
    setTimeout(() => {
      this.popupVisible = true; // Cambia el estado a true para abrir el popup
    }, 0); // Usa un pequeño retraso para forzar la detección de cambios
  }

  // Método para manejar el cierre del popup
  closePopup() {
    this.categoryService = new CategoryService(); // Reiniciar la categoría
    this.popupVisible = false; // Cerrar el popup
  }

  // Método para cargar todas las categorías
  loadCategories() {
    this.categoryServiceService.getAll().subscribe((categories) => {
      if (categories) this.categoryServices = categories;
    });
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
      error: (err) => alert(err.error.message),
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
          this.loadCategories();
        },
        error: (err) => alert(err.error.message),
      });
    }
  }

  // Método para guardar una categoría
  saveCategoryService(category: CategoryService) {
    if (category.id) {
      // Actualizar categoría existente
      this.categoryServiceService.update(+category.id, category).subscribe({
        next: () => {
          this.loadCategories(); // Recargar categorías
          this.popupVisible = false; // Cerrar el popup
          this.categoryService = new CategoryService(); // Reiniciar la categoría
        },
        error: (err) => alert(err.error.message),
      });
    } else {
      // Crear nueva categoría
      this.categoryServiceService.create(category).subscribe({
        next: () => {
          this.loadCategories(); // Recargar categorías
          this.popupVisible = false; // Cerrar el popup
          this.categoryService = new CategoryService(); // Reiniciar la categoría
        },
        error: (err) => alert(err.error.message),
      });
    }
  }
}

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
export class CategoryServiceModule {}
