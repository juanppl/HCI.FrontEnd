import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/citas-create/citas-create.component').then(m => m.CitasCreateComponent),
    data: {
      title: `Main`
    }
  }
];

