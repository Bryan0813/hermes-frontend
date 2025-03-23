import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  NgModule,
} from '@angular/core';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Input() visible: boolean = false; // Controla la visibilidad del popup
  @Output() visibleChange = new EventEmitter<boolean>(); // Emite cambios de visibilidad

  closePopup() {
    this.visible = false; // Cambia el estado a false
    this.visibleChange.emit(this.visible); // Emite el cambio al componente padre
  }
}

@NgModule({
  imports: [CommonModule, DxPopupModule, DxButtonModule],
  declarations: [PopupComponent],
  exports: [PopupComponent],
})
export class PopupModule {}
