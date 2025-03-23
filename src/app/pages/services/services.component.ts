import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
} from 'devextreme-angular';
import { Service } from '../../shared/models';
import { ServiceService } from '../../shared/services/modules/service.service';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  popupVisible = false; //Variable para mostrar el popup
  categoryService: Service = new Service(); //Categoria individual
  categoryServices: Service[] = []; //Array de todas las categorias

  //Constructor para agregar los servicios necesarios
  constructor(private serviceService: ServiceService) {}

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
    this.serviceService.getAll().subscribe((data) => {
      if (data) this.categoryServices = data;
    });
  }

  //Metodo para cargar una categoria
  loadCategoryService(id: number) {
    this.serviceService.getById(id).subscribe((data) => {
      this.categoryService = data;
    });
  }

  //Metodo para guardar una categoria
  saveCategoryService($event: any) {
    const id = $event.row.key;
    if (id === 0) {
      this.serviceService.create(this.categoryService).subscribe((created) => {
        if (created) this.loadCategorys();
      });
    } else {
      this.serviceService.getById(id).subscribe((category) => {
        // if (category) //Cargar popup
      });
    }
    this.categoryService = new Service();
  }

  //Metodo para eliminar una categoria
  deleteCategoryService($event: any) {
    const id = $event.row.key;
    // console.log(id);

    this.serviceService.delete(id).subscribe((deleted) => {
      if (deleted) this.loadCategorys();
    });
  }
}

@NgModule({
  declarations: [ServicesComponent],
  imports: [CommonModule, DxDataGridModule, DxButtonModule, DxFormModule],
  exports: [ServicesComponent],
})
export class ServiceModule {}
