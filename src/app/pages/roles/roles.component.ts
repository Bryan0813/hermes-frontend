import { Component } from '@angular/core';
import { PermitsService } from '../../shared/services';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  public data: any;

  constructor(private permitsService: PermitsService) {}

  ngOnInit(): void {
    this.permitsService.getData().subscribe((response) => {
      this.data = response;
    });
  }
}
