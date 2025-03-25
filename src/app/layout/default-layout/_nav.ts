import { INavData } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';

export interface INavDataProps extends INavData {
  needValidation?: boolean;
}

export const navItems: INavDataProps[] = [
  {
    title: true,
    name: 'Administración'
  },
  {
    name: 'Pacientes',
    url: '/pacientes-register',
    iconComponent: { name: 'cil-people' },
    needValidation: false,
  },
  {
    name: 'Medicos',
    url: '/medicos-register',
    iconComponent: { name: 'cil-people' },
    needValidation: false,
  },
  {
    name: 'Especialidades',
    url: '/especialidades-register',
    iconComponent: { name: 'cil3d' },
    needValidation: false,
  },
  {
    name: 'Roles',
    url: '/roles-register',
    iconComponent: { name: 'cil-spreadsheet' },
    needValidation: false,
  },
  {
    title: true,
    name: 'Autogestión'
  },
  {
    name: 'Citas',
    url: '/citas-create',
    iconComponent: { name: 'cil-calendar' },
    needValidation: false,
  },
  {
    name: 'Turnos',
    url: '/turnos-create',
    iconComponent: { name: 'cil-pencil' },
    needValidation: true,
  },
  {
    name: 'Historico',
    url: '/user-history',
    iconComponent: { name: 'cil-clipboard' },
    needValidation: true,
  }
];

export function getNavItems(authService: AuthService): INavDataProps[] {
  return navItems.filter(item => userValidation(authService, item));
}

function userValidation(authService: AuthService, prop: INavDataProps): boolean {
  if (!prop.needValidation) return true;
  const user = authService.getLoggedUser();
  return user.is_superuser;
}
