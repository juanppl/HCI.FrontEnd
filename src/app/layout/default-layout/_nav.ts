import { INavData } from '@coreui/angular';

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

export function getNavItems(): INavDataProps[] {
  return navItems;
}
