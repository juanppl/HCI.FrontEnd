import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../models/MedicalModels';
import { MedicalService } from '../../../services/medical.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes-admin-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pacientes-admin-form.component.html',
  styleUrl: './pacientes-admin-form.component.scss'
})
export class PacientesAdminFormComponent {

  public paciente: Usuario | null = this.initializeProduct();
  private subscription$: Subscription;
  public isSaving = false;

  constructor(private medicalService: MedicalService) {
    this.subscription$ = this.medicalService.selectedUsuario$
      .subscribe((paciente: Usuario | null) => {
        this.paciente = paciente;
        if (!this.paciente) this.paciente = this.initializeProduct();
      });
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

  public cancel(): void {
    this.medicalService.displayTable$.next(true);
  }

  public save(): void {
      this.isSaving = true;
      if (this.paciente?.idUsuario && this.paciente.idUsuario != -1) {
        this.editProduct(this.paciente);
      } else {
        this.addNewProduct(this.paciente!);
      }
    }
  
    private addNewProduct(paciente: Usuario): void {
      this.medicalService.createUsuario(paciente)
        .subscribe({
          next: () => {
            this.isSaving = false;
            this.medicalService.displayTable$.next(true);
            this.medicalService.refreshTable$.next();
            Swal.fire({
              title: "Creado Exitoso!",
              text: "Se ha creado el paciente exitosamente!",
              icon: "success"
            });
          }
        });
    }
  
    private editProduct(paciente: Usuario): void {
      this.medicalService.editUsuario(paciente)
        .subscribe({
          next: () => {
            this.isSaving = false;
            this.medicalService.displayTable$.next(true);
            this.medicalService.refreshTable$.next();
            Swal.fire({
              title: "Editado Exitoso!",
              text: "Se ha editado el paciente exitosamente!",
              icon: "success"
            });
          }
        });
    }
}
