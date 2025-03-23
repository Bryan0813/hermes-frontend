import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
} from 'devextreme-angular';
import { Activity } from '../../shared/models';
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
  popupVisible = false; // Variable para controlar la visibilidad del popup
  activity: Activity = new Activity(); //Actividad individual
  activities: Activity[] = []; //Array de todas las actividades

  //Constructor para agregar los servicios necesarios
  constructor(private activyService: ActivityService) {
    this.deleteActivity = this.deleteActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
  }

  //Metodo para cargar cuando inicia la pagina
  ngOnInit(): void {
    this.loadActivities();
  }

  // Método para mostrar el popup
  showPopup() {
    this.popupVisible = false; // Asegúrate de que el estado sea false antes de abrir
    setTimeout(() => {
      this.popupVisible = true; // Cambia el estado a true para abrir el popup
    }, 0); // Usa un pequeño retraso para forzar la detección de cambios
  }

  // Método para manejar el cierre del popup
  onPopupClose(visible: boolean) {
    this.activity = new Activity(); // Reiniciar la actividad
    this.popupVisible = visible;
  }

  //Metodo para cargar todas las categorias
  loadActivities() {
    this.activyService.getAll().subscribe((activities) => {
      if (activities) this.activities = activities;
    });
  }

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
      error: (err) => alert(err.error.message),
    });
  }

  //Metodo para eliminar una categoria
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
          this.loadActivities();
        },
        error: (err) => alert(err.error.message),
      });
    }
  }

  saveActivity(activity: Activity) {
    if (activity.id) {
      // Actualizar actividad existente
      this.activyService.update(activity).subscribe({
        next: () => {
          this.loadActivities(); // Recargar actividades
          this.popupVisible = false; // Cerrar el popup
          this.activity = new Activity(); // Reiniciar la actividad
        },
        error: (err) => alert(err.error.message),
      });
    } else {
      // Crear nueva actividad
      this.activyService.create(activity).subscribe({
        next: () => {
          this.loadActivities(); // Recargar actividades
          this.popupVisible = false; // Cerrar el popup
          this.activity = new Activity(); // Reiniciar la actividad
        },
        error: (err) => alert(err.error.message),
      });
    }
  }

  closePopup() {
    this.activity = new Activity(); // Reiniciar la actividad
    this.popupVisible = false; // Cerrar el popup
  }
}
@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    PopupModule,
    ActivityFormModule,
  ],
  exports: [ActivitiesComponent],
})
export class ActivitiesModule {}
