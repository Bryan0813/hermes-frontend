import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { PopupModule } from '../../shared/components/popup/popup.component';
import { RolesFormModule } from '../../shared/components/modules';
import { RolesModel } from '../../shared/models';
import { RolesService } from '../../shared/services/modules';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  //#region variables
  popupVisible = false; // Variable para controlar la visibilidad del popup
  role: RolesModel = new RolesModel(); // Rol individual
  roles: RolesModel[] = []; // Array de todos los roles
  //#endregion

  //#region constructor e init
  constructor(private roleService: RolesService) {
    this.deleteRole = this.deleteRole.bind(this);
    this.editRole = this.editRole.bind(this);
  }

  ngOnInit(): void {
    this.getAllRoles();
  }
  //#endregion

  //#region metodos & servicios
  // Método para cargar todos los roles
  getAllRoles() {
    this.roleService.getAll().subscribe((roles) => {
      if (roles) this.roles = roles;
    });
  }

  // Método para guardar un rol
  saveRole(role: RolesModel) {
    if (role.id) {
      // Actualizar rol existente
      this.roleService.update(role).subscribe({
        next: () => {
          this.getAllRoles(); // Recargar roles
          this.popupVisible = false; // Cerrar el popup
          this.role = new RolesModel(); // Reiniciar el rol
        },
        error: (err) => console.error(err.error.message),
      });
    } else {
      // Crear nuevo rol
      this.roleService.create(role).subscribe({
        next: () => {
          this.getAllRoles(); // Recargar roles
          this.popupVisible = false; // Cerrar el popup
          this.role = new RolesModel(); // Reiniciar el rol
        },
        error: (err) => console.error(err.error.message),
      });
    }
  }

  // Método para editar un rol
  editRole($event: any): void {
    const id = $event.row.key;
    if (!id) {
      console.error('No se pudo obtener el ID del rol.');
      return;
    }
    this.roleService.getById(id).subscribe({
      next: (roleFound) => {
        this.role = roleFound;
        this.showPopup();
      },
      error: (err) => console.error(err.error.message),
    });
  }

  // Método para eliminar un rol
  deleteRole($event: any): void {
    const id = $event.row.key;

    if (!id) {
      console.error('No se pudo obtener el ID del rol.');
      return;
    }

    const confirmDelete = confirm(
      '¿Estás seguro de que deseas eliminar este rol?'
    );

    if (confirmDelete) {
      this.roleService.delete(id).subscribe({
        next: () => {
          this.getAllRoles();
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
    this.role = new RolesModel(); // Reiniciar el rol
    this.popupVisible = false; // Cerrar el popup
  }
  //#endregion
}

//#region module
@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    PopupModule,
    RolesFormModule,
  ],
  exports: [RolesComponent],
})
export class RolesModule { }
//#endregion