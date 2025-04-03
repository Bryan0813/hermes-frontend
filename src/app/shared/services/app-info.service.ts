import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  public readonly title: string = 'Hermes';

  public get currentYear() {
    return new Date().getFullYear();
  }
}
