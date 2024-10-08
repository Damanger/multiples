// tabs.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  tabs = [
    { title: 'Números', icon: 'calculator', path: 'numeros' },
  ];
  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === `/${path}`;
  }
}
