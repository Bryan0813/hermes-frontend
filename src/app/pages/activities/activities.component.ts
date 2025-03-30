import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ActivityModel } from '../../shared/models';
import { ActivityService } from '../../shared/services/modules/activity.service';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { ActivityFormModule } from '../../shared/components/modules';
import notify from 'devextreme/ui/notify';
import { message } from '../../shared/constants/message';
import { NOTIFY_SIZE, SET_TIMEOUT, TYPE_NOTIFY } from '../../shared/constants/utils';

@Component({
  selector: 'app-activities',
  standalone: false,
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
  //#region variables
  popupVisible = false; // Variable para controlar la visibilidad del popup
  activity: ActivityModel = new ActivityModel(); //Actividad individual
  activities: ActivityModel[] = []; //Array de todas las actividades
  //#endregion

  //#region constructor e init
  constructor(private activyService: ActivityService) {
    this.changeStatusActivity = this.changeStatusActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
  }

  ngOnInit(): void {
    this.getAllActivities();
  }
  //#endregion

  //#region metodos & servicios
  //Metodo para cargar todas las categorias
  getAllActivities() {
    this.activyService.getAll().subscribe(
      {
        next: (activities) => {
          this.activities = activities;
        },
        error: (err) => console.error(err.error.message),
      }
    );
  }

  //Metodo para crear una actividad
  saveActivity(activity: ActivityModel) {
    if (activity.id) {
      // Actualizar actividad existente
      this.activyService.update(activity).subscribe({
        next: (success) => {
          notify({
            message: message('La actividad', 'actualizada', true),
            width: NOTIFY_SIZE,
          },
          TYPE_NOTIFY.success,
          SET_TIMEOUT)
          this.getAllActivities(); // Recargar actividades
          this.popupVisible = false; // Cerrar el popup
          this.activity = new ActivityModel(); // Reiniciar la actividad
        },
        error: (err) => notify({
          message: message('la actividad', 'actualizar', false),
          width: NOTIFY_SIZE,
        },
        TYPE_NOTIFY.error,
        SET_TIMEOUT)
      });
    } else {
      // Crear nueva actividad
      this.activyService.create(activity).subscribe({
        next: () => {
          notify({
            message: message('La actividad', 'guardada', true),
            width: NOTIFY_SIZE,
          },
          TYPE_NOTIFY.success,
          SET_TIMEOUT)
          this.getAllActivities(); // Recargar actividades
          this.popupVisible = false; // Cerrar el popup
          this.activity = new ActivityModel(); // Reiniciar la actividad
        },
        error: (err) => notify({
          message: message('la actividad', 'cambiada de estado', false),
          width: NOTIFY_SIZE,
        },
        TYPE_NOTIFY.error,
        SET_TIMEOUT),
      });
    }
  }

  //Metodo para editar una actividad
  editActivity($event: any): void {
    const id = $event.row.key;
    if (!id) {
      console.error('No se pudo obtener el ID de la actividad.');
      return;
    }
    this.activyService.getById(id).subscribe({
      next: (activityFound) => {
        this.activity = activityFound;
        this.showPopup();
      },
      error: (err) => notify({
        message: message('la actividad', 'actualizar', false),
        width: NOTIFY_SIZE,
      },
      TYPE_NOTIFY.error,
      SET_TIMEOUT),
    });
  }

  //Metodo para eliminar una actividad
  changeStatusActivity($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID de la actividad.');
      return;
    }

    const confirmDelete = confirm(
      '¿Estás seguro de que deseas cambiar el estado de esta actividad?'
    );

    if (confirmDelete) {
      this.activyService.changeStatus(id).subscribe({
        next: (success) => {
          notify({
            message: message('La actividad', 'cambiada de estado', true),
            width: NOTIFY_SIZE,
          },
          TYPE_NOTIFY.success,
          SET_TIMEOUT)
          this.getAllActivities();
        },
        error: (err) => notify({
          message: message('la actividad', 'cambiar estado', false),
          width: NOTIFY_SIZE,
        },
        TYPE_NOTIFY.success,
        SET_TIMEOUT)
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
    this.activity = new ActivityModel(); // Reiniciar la actividad
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
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    PopupModule,
    ActivityFormModule,
  ],
  exports: [ActivitiesComponent],
})
export class ActivitiesModule { }
//#endregion
