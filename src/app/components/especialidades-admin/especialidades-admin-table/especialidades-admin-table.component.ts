import { Component, Input } from '@angular/core';
import { Especialidad } from '../../../models/MedicalModels';
import { MedicalService } from '../../../services/medical.service';

@Component({
  selector: 'app-especialidades-admin-table',
  standalone: true,
  imports: [],
  templateUrl: './especialidades-admin-table.component.html',
  styleUrl: './especialidades-admin-table.component.scss'
})
export class EspecialidadesAdminTableComponent {
  @Input({required: true}) especialidades: Especialidad[] = [];

  constructor(private medicalService: MedicalService) {}

  editEspecialidad(especialidad: Especialidad) {
    this.medicalService.displayTable$.next(false);
    this.medicalService.selectedEspecialidad$.next(especialidad);
  }
}
