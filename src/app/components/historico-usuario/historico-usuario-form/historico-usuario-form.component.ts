import { Component } from '@angular/core';
import { Usuario } from '../../../models/MedicalModels';
import { MedicalService } from '../../../services/medical.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historico-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico-usuario-form.component.html',
  styleUrl: './historico-usuario-form.component.scss'
})
export class HistoricoUsuarioFormComponent {

  public isLoading = false;
  public pacientes: Usuario[] = [];
  public selectedPaciente: Usuario = this.initializeProduct();

  constructor(private medicalService: MedicalService) {}

  ngOnInit(): void {
    this.getAllUsers();
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

  getAllUsers() {
    this.isLoading = true;
    this.medicalService.getListOfUsers()
      .subscribe({
        next: (pacientes: Usuario[]) => {
          this.pacientes = pacientes.filter(p => p.idRol == 1);
          this.isLoading = false;
        }
      });
  }

  buscarHistorial() {
    this.medicalService.selectedUsuarioHistorial$.next(this.selectedPaciente);    
    setTimeout(() => {
      this.medicalService.displayTable$.next(true);
    }, 100);
  }

}
