import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { Package } from '../../shared/models/package';
import { PackageService } from '../../shared/services/modules/package.service';
import { Service } from '../../shared/models/service';
import { ServiceService } from '../../shared/services/modules/service.service';
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
  package: Package = new Package(); // Paquete individual
  packages: Package[] = []; // Array de todos los paquetes
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
      error: (err) => alert(err.error.message),
    });
  }

  // Método para cargar todos los servicios
  getServiceByPackage($event: any) {
    const id = $event.selectedRowsData[0].id;
    if (!id) {
      console.error('No se pudo obtener el ID del paquete.');
      return;
    }
    this.packageService.getServicePackages(+id).subscribe({
      next: (serviceByPackage) => {
        this.serviceByPackage = serviceByPackage;
        console.log(this.serviceByPackage);
      },
      error: (err) => alert(err.error.message),
    });
  }

  // Método para guardar un paquete
  savePackage(pkg: Package) {
    if (pkg.id) {
      this.packageService.update(pkg).subscribe({
        next: () => {
          this.getAllPackages();
          this.popupVisible = false;
          this.package = new Package();
        },
        error: (err) => alert(err.error.message),
      });
    } else {
      this.packageService.create(pkg).subscribe({
        next: () => {
          this.getAllPackages();
          this.popupVisible = false;
          this.package = new Package();
        },
        error: (err) => alert(err.error.message),
      });
    }
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
      error: (err) => alert(err.error.message),
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
        error: (err) => alert(err.error.message),
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
    this.package = new Package();
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
