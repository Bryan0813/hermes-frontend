import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
} from 'devextreme-angular';
import { Activity } from '../../shared/models';
import { ActivityService } from '../../shared/services/modules/activity.service';

@Component({
  selector: 'app-activities',
  standalone: false,
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
  popupVisible = false; //Variable para mostrar el popup
  activity: Activity = new Activity(); //Actividad individual
  activities: Activity[] = []; //Array de todas las actividades

  //Constructor para agregar los servicios necesarios
  constructor(private activyService: ActivityService) {}

  //Metodo para cargar cuando inicia la pagina
  ngOnInit(): void {
    this.loadActivities();
  }

  //Metodo para cargar el popup
  showPopup() {
    this.popupVisible = !this.popupVisible;
  }

  //Metodo para cargar todas las categorias
  loadActivities() {
    this.activyService.getAll().subscribe((data) => {
      if (data) this.activities = data;
    });
  }

  //Metodo para cargar una categoria
  // loadCategoryService(id: number) {
  //   this.activyService.getById(id).subscribe((data) => {
  //     this.categoryService = data;
  //   });
  // }

  //Metodo para guardar una categoria
  // saveCategoryService($event: any) {
  //   const id = $event.row.key;
  //   if (id === 0) {
  //     this.activyService.create(this.categoryService).subscribe((created) => {
  //       if (created) this.loadActivities();
  //     });
  //   } else {
  //     this.activyService.getById(id).subscribe((category) => {
  //       // if (category) //Cargar popup
  //     });
  //   }
  //   this.categoryService = new CategoryService();
  // }

  //Metodo para eliminar una categoria
  deleteActivity($event: any) {
    const id = $event.row.key;
    // console.log(id);

    // this.activyService.delete(id).subscribe((deleted) => {
    //   if (deleted) this.loadActivities();
    // });
  }
}
@NgModule({
  declarations: [ActivitiesComponent],
  imports: [CommonModule, DxDataGridModule, DxButtonModule, DxFormModule],
  exports: [ActivitiesComponent],
})
export class ActivitiesModule {}
