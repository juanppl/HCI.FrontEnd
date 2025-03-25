import { Component, Input } from '@angular/core';
import { Usuario } from '../../../models/MedicalModels';
import { MedicalService } from '../../../services/medical.service';

@Component({
  selector: 'app-pacientes-admin-table',
  standalone: true,
  imports: [],
  templateUrl: './pacientes-admin-table.component.html',
  styleUrl: './pacientes-admin-table.component.scss'
})
export class PacientesAdminTableComponent {

  @Input({required: true}) pacientes: Usuario[] = [];

  constructor(private medicalService: MedicalService) {}

  editPaciente(paciente: Usuario) {
    this.medicalService.displayTable$.next(false);
    this.medicalService.selectedUsuario$.next(paciente);
  }
  
}
