import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ActivityModel } from '../../shared/models';
import { ActivityService } from '../../shared/services/modules/activity.service';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { ActivityFormModule } from '../../shared/components/modules';

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
    this.deleteActivity = this.deleteActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
  }

  ngOnInit(): void {
    this.getAllActivities();
  }
  //#endregion

  //#region metodos & servicios
  //Metodo para cargar todas las categorias
  getAllActivities() {
    this.activyService.getAll().subscribe((activities) => {
      if (activities) this.activities = activities;
    });
  }

  //Metodo para crear una actividad
  saveActivity(activity: ActivityModel) {
    if (activity.id) {
      // Actualizar actividad existente
      this.activyService.update(activity).subscribe({
        next: () => {
          this.getAllActivities(); // Recargar actividades
          this.popupVisible = false; // Cerrar el popup
          this.activity = new ActivityModel(); // Reiniciar la actividad
        },
        error: (err) => console.error(err.error.message),
      });
    } else {
      // Crear nueva actividad
      this.activyService.create(activity).subscribe({
        next: () => {
          this.getAllActivities(); // Recargar actividades
          this.popupVisible = false; // Cerrar el popup
          this.activity = new ActivityModel(); // Reiniciar la actividad
        },
        error: (err) => console.error(err.error.message),
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
      error: (err) => console.error(err.error.message),
    });
  }

  //Metodo para eliminar una actividad
  deleteActivity($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID de la actividad.');
      return;
    }

    const confirmDelete = confirm(
      '¿Estás seguro de que deseas eliminar esta actividad?'
    );

    if (confirmDelete) {
      this.activyService.delete(id).subscribe({
        next: () => {
          this.getAllActivities();
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
    this.activity = new ActivityModel(); // Reiniciar la actividad
    this.popupVisible = false; // Cerrar el popup
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
