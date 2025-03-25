import { Component, Input } from '@angular/core';
import { Usuario } from '../../../models/MedicalModels';
import { MedicalService } from '../../../services/medical.service';

@Component({
  selector: 'app-medicos-admin-table',
  standalone: true,
  imports: [],
  templateUrl: './medicos-admin-table.component.html',
  styleUrl: './medicos-admin-table.component.scss'
})
export class MedicosAdminTableComponent {
  @Input({required: true}) medicos: Usuario[] = [];

  constructor(private medicalService: MedicalService) {}

  editMedico(medico: Usuario) {
    this.medicalService.displayTable$.next(false);
    this.medicalService.selectedUsuario$.next(medico);
  }
}
