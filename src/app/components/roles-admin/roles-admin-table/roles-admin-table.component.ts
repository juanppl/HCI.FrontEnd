import { Component, Input } from '@angular/core';
import { Roles } from '../../../models/MedicalModels';
import { MedicalService } from '../../../services/medical.service';

@Component({
  selector: 'app-roles-admin-table',
  standalone: true,
  imports: [],
  templateUrl: './roles-admin-table.component.html',
  styleUrl: './roles-admin-table.component.scss'
})
export class RolesAdminTableComponent {
  @Input({ required: true }) roles: Roles[] = [];

  constructor(private medicalService: MedicalService) { }

  editRol(rol: Roles) {
    this.medicalService.displayTable$.next(false);
    this.medicalService.selectedRol$.next(rol);
  }
}
