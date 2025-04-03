import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxLoadIndicatorModule,
} from 'devextreme-angular';
import { CategoryServiceModel } from '../../shared/models';
import { CategoryServiceService } from '../../shared/services/modules/category-service.service';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { CategoryServiceFormModule } from '../../shared/components/modules';
import notify from 'devextreme/ui/notify';
import { message } from '../../shared/constants/message';
import {
  NOTIFY_SIZE,
  SET_TIMEOUT,
  TYPE_NOTIFY,
} from '../../shared/constants/utils';

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
  loading = false; // Variable para controlar el indicador de carga
  //#endregion

  //#region constructor e init
  constructor(private categoryServiceService: CategoryServiceService) {
    this.changeStatusCategoryService =
      this.changeStatusCategoryService.bind(this);
    this.editCategoryService = this.editCategoryService.bind(this);
  }

  ngOnInit(): void {
    this.getAllCategories();
  }
  //#endregion

  //#region metodos & servicios
  // Método para cargar todas las categorías
  getAllCategories() {
    this.loading = true; // Mostrar indicador de carga
    this.categoryServiceService.getAll().subscribe({
      next: (categories) => {
        this.categoryServices = categories;
        this.loading = false; // Ocultar indicador de carga
      },
      error: (err) => {
        this.loading = false; // Ocultar indicador de carga
        notify(
          {
            message: message('las categorías', 'cargar', false),
            width: NOTIFY_SIZE,
          },
          TYPE_NOTIFY.error,
          SET_TIMEOUT
        );
      },
    });
  }

  // Método para guardar una categoría
  saveCategoryService(category: CategoryServiceModel) {
    this.loading = true; // Mostrar indicador de carga
    if (category.id) {
      // Actualizar categoría existente
      this.categoryServiceService.update(category).subscribe({
        next: () => {
          notify(
            {
              message: message('la categoría', 'actualizada', true),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.success,
            SET_TIMEOUT
          );
          this.getAllCategories(); // Recargar categorías
          this.popupVisible = false; // Cerrar el popup
          this.categoryService = new CategoryServiceModel(); // Reiniciar la categoría
          this.loading = false; // Ocultar indicador de carga
        },
        error: (err) => {
          this.loading = false; // Ocultar indicador de carga
          notify(
            {
              message: message('la categoría', 'actualizar', false),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.error,
            SET_TIMEOUT
          );
        },
      });
    } else {
      // Crear nueva categoría
      this.categoryServiceService.create(category).subscribe({
        next: () => {
          notify(
            {
              message: message('la categoría', 'guardada', true),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.success,
            SET_TIMEOUT
          );
          this.getAllCategories(); // Recargar categorías
          this.popupVisible = false; // Cerrar el popup
          this.categoryService = new CategoryServiceModel(); // Reiniciar la categoría
          this.loading = false; // Ocultar indicador de carga
        },
        error: (err) => {
          this.loading = false; // Ocultar indicador de carga
          notify(
            {
              message: message('la categoría', 'guardar', false),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.error,
            SET_TIMEOUT
          );
        },
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
      error: (err) =>
        notify(
          {
            message: message('la categoria', 'actualizar', false),
            width: NOTIFY_SIZE,
          },
          TYPE_NOTIFY.error,
          SET_TIMEOUT
        ),
    });
  }

  // Método para cambiar el estado de una categoría
  changeStatusCategoryService($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID de la categoría.');
      return;
    }

    const confirmDelete = confirm(
      '¿Estás seguro de que deseas cambiar el estado de esta categoría?'
    );

    if (confirmDelete) {
      this.loading = true; // Mostrar indicador de carga
      this.categoryServiceService.changeStatus(id).subscribe({
        next: () => {
          notify(
            {
              message: message('la categoría', 'cambiada de estado', true),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.success,
            SET_TIMEOUT
          );
          this.getAllCategories();
          this.loading = false; // Ocultar indicador de carga
        },
        error: (err) => {
          this.loading = false; // Ocultar indicador de carga
          notify(
            {
              message: message('la categoría', 'cambiar estado', false),
              width: NOTIFY_SIZE,
            },
            TYPE_NOTIFY.error,
            SET_TIMEOUT
          );
        },
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

  //#region conditions
  // Método para cambiar el color del texto de la celda según el estado del servicio
  onCellPrepared(e: any) {
    if (e.rowType === 'data' && e.column.dataField === 'status') {
      e.cellElement.style.color = e.data.status === true ? 'green' : 'red';
      e.cellElement.textContent =
        e.data.status === true ? 'Activo' : 'Inactivo';

      // e.watch(
      //   function () {
      //     return e.data.status;
      //   },
      //   function () {
      //     e.cellElement.style.color = e.data.status === true ? 'green' : 'red';
      //   }
      // );
    }
  }
  //#endregion
}

//#region module
@NgModule({
  declarations: [CategoryServiceComponent],
  imports: [
    CommonModule,
    DxLoadIndicatorModule,
    DxDataGridModule,
    DxButtonModule,
    PopupModule,
    CategoryServiceFormModule,
  ],
  exports: [CategoryServiceComponent],
})
export class CategoryServiceModule {}
//#endregion
