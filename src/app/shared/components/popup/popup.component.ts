import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { DxPopupModule } from 'devextreme-angular';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  visible = false;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}

@NgModule({
  imports: [CommonModule, DxPopupModule],
  declarations: [PopupComponent],
  exports: [PopupComponent],
})
export class PopupModule {}
