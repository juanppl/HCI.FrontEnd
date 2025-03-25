import { Component } from '@angular/core';
import { HistoricoUsuarioFormComponent } from '../../../components/historico-usuario/historico-usuario-form/historico-usuario-form.component';
import { HistoricoUsuarioTableComponent } from '../../../components/historico-usuario/historico-usuario-table/historico-usuario-table.component';
import { CitaOutput, MedicalService } from '../../../services/medical.service';
import { Cita, Usuario } from '../../../models/MedicalModels';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [HistoricoUsuarioFormComponent, HistoricoUsuarioTableComponent, SpinnerComponent],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.scss'
})
export class UserHistoryComponent {

  public paciente: Usuario = this.initializeProduct();
  public displayTable = false;
  public userHistory: CitaOutput[] = [];
  isLoading: boolean = false;

  constructor(private medicalService: MedicalService) {
    this.medicalService.selectedUsuarioHistorial$.subscribe((paciente: Usuario | null) => {
      this.paciente = paciente!;
      this.getSelectedPacientHistory();
    });
    this.medicalService.displayTable$.subscribe((displayTable: boolean) => this.displayTable = displayTable);
  }

  initializeProduct(): Usuario {
    return {
      idUsuario: null,
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      email: '',
      idRol: 1,
      fechaRegistro: null,
      medicoEspecialidad: []
    }
  }

  getSelectedPacientHistory() {
    this.isLoading = true;
    this.medicalService.getListOfUserHistory(this.paciente.idUsuario!)
      .subscribe({
        next: (userHistory: CitaOutput[]) => {
          this.userHistory = userHistory;
          this.isLoading = false;
        }
      });
  }
}
