import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes),
        
      },
      {
        path: 'products-admin',
        loadComponent: () => import('./views/pages/products-admin/products-admin.component').then((m) => m.ProductsAdminComponent),
        
      },
      {
        path: 'profile',
        loadComponent: () => import('./views/pages/profile/profile.component').then((m) => m.ProfileComponent),
        
      },
      {
        path: 'shop-products',
        loadComponent: () => import('./views/pages/products-to-shop/products-to-shop.component').then((m) => m.ProductsToShopComponent),
        
      },
      {
        path: 'orders',
        loadComponent: () => import('./views/pages/orders/orders.component').then((m) => m.OrdersComponent)
      },
      {
        path: 'pacientes-register',
        loadComponent: () => import('./views/pages/pacientes-register/pacientes-register.component').then((m) => m.PacientesRegisterComponent)
      },
      {
        path: 'medicos-register',
        loadComponent: () => import('./views/pages/medicos-register/medicos-register.component').then((m) => m.MedicosRegisterComponent)
      },
      {
        path: 'especialidades-register',
        loadComponent: () => import('./views/pages/especialidades-register/especialidades-register.component').then((m) => m.EspecialidadesRegisterComponent)
      },
      {
        path: 'roles-register',
        loadComponent: () => import('./views/pages/roles-register/roles-register.component').then((m) => m.RolesRegisterComponent)
      },
      {
        path: 'citas-create',
        loadComponent: () => import('./views/pages/citas-create/citas-create.component').then((m) => m.CitasCreateComponent)
      },
      {
        path: 'turnos-create',
        loadComponent: () => import('./views/pages/turnos-create/turnos-create.component').then((m) => m.TurnosCreateComponent)
      },
      {
        path: 'user-history',
        loadComponent: () => import('./views/pages/user-history/user-history.component').then((m) => m.UserHistoryComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'citas-create' }
];
