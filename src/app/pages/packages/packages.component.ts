import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { PackageModel } from '../../shared/models/package';
import { PackageService } from '../../shared/services/modules/package.service';
import { PopupModule } from '../../shared/components';
import { PackagesFormModule } from '../../shared/components/modules';
import { PackageServiceModel } from '../../shared/models';

@Component({
  selector: 'app-packages',
  standalone: false,
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss',
})
export class PackagesComponent {
  //#region variables
  popupVisible = false; // Variable para controlar la visibilidad del popup
  package: PackageModel = new PackageModel(); // Paquete individual
  packages: PackageModel[] = []; // Array de todos los paquetes
  serviceByPackage: PackageServiceModel[] = []; // Array de servicios por paquete
  //#endregion

  //#region constructor e init
  constructor(private packageService: PackageService) {
    this.changeStatus = this.changeStatus.bind(this);
    this.editPackage = this.editPackage.bind(this);
    this.onCellPrepared = this.onCellPrepared.bind(this);
    this.getServiceByPackage = this.getServiceByPackage.bind(this);
  }

  ngOnInit(): void {
    this.getAllPackages();
  }
  //#endregion

  //#region metodos & servicios
  // Método para cargar todos los paquetes
  getAllPackages() {
    this.packageService.getAll().subscribe({
      next: (packages) => {
        this.packages = packages;
      },
      error: (err) => console.error(err.error.message),
    });
  }

  // Método para cargar los servicios por paquete
  getServiceByPackage($event: any) {
    const id = $event.selectedRowsData[0].id;

    if (!id) {
      console.error('No se pudo obtener el ID del paquete.');
      return;
    }

    this.packageService.getServicePackages(+id).subscribe({
      next: (serviceByPackage) => {
        this.serviceByPackage = serviceByPackage;
        $event.component.collapseAll(-1);
        $event.component.expandRow($event.currentSelectedRowKeys[0]);
      },
      error: (err) => {
        $event.component.collapseAll(-1);
        console.error(err.error.message);
      },
    });
  }

  // Método para guardar un paquete
  savePackage(pkg: PackageModel) {
    if (pkg.id) {
      this.packageService.update(pkg).subscribe({
        next: () => {
          this.getAllPackages();
          this.popupVisible = false;
          this.package = new PackageModel();
        },
        error: (err) => console.error(err.error.message),
      });
    } else {
      this.packageService.create(pkg).subscribe({
        next: () => {
          this.getAllPackages();
          this.popupVisible = false;
          this.package = new PackageModel();
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }

  saveServicesFromPackage(services: PackageServiceModel[]) {
    services.forEach((service) => {
      service.idPackage = this.package.id;
      this.packageService.createServicePackage(service).subscribe({
        next: () => {
          this.getAllPackages();
          this.popupVisible = false;
          this.package = new PackageModel();
        },
        error: (err) => console.error(err.error.message),
      });
    });
  }

  // Método para editar un paquete
  editPackage($event: any): void {
    const id = $event.row.key;
    if (!id) {
      console.error('No se pudo obtener el ID del paquete.');
      return;
    }
    this.packageService.getById(id).subscribe({
      next: (packageFound) => {
        this.package = packageFound;
        this.showPopup();
      },
      error: (err) => console.error(err.error.message),
    });
  }

  // Método para cambiar el estado de un paquete
  changeStatus($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID del paquete.');
      return;
    }

    const confirmChange = confirm(
      '¿Estás seguro de que deseas cambiar el estado de este paquete?'
    );

    if (confirmChange) {
      this.packageService.changeStatus(id).subscribe({
        next: () => {
          this.getAllPackages();
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }
  //#endregion

  //#region Eventos
  showPopup() {
    this.popupVisible = false;
    setTimeout(() => {
      this.popupVisible = true;
    }, 0);
  }

  closePopup() {
    this.package = new PackageModel();
    this.popupVisible = false;
  }
  //#endregion

  //#region conditions
  // Método para cambiar el color del texto de la celda según el estado del paquete
  onCellPrepared(e: any) {
    if (e.rowType === 'data' && e.column.dataField === 'status') {
      e.cellElement.style.color = e.data.status === true ? 'green' : 'red';
      e.cellElement.textContent =
        e.data.status === true ? 'Activo' : 'Inactivo';
    }
  }
  //#endregion
}

//#region module
@NgModule({
  declarations: [PackagesComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxTemplateModule,
    PopupModule,
    PackagesFormModule,
  ],
  exports: [PackagesComponent],
})
export class PackagesModule {}
//#endregion
