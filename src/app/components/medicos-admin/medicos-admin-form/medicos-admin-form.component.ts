import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/MedicalModels';
import { Subscription } from 'rxjs';
import { MedicalService } from '../../../services/medical.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicos-admin-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './medicos-admin-form.component.html',
  styleUrl: './medicos-admin-form.component.scss'
})
export class MedicosAdminFormComponent {
  
  public medico: Usuario | null = this.initializeProduct();
  private subscription$: Subscription;
  public isSaving = false;

  constructor(private medicalService: MedicalService) {
    this.subscription$ = this.medicalService.selectedUsuario$
      .subscribe((medico: Usuario | null) => {
        this.medico = medico;
        if (!this.medico) this.medico = this.initializeProduct();
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
      if (this.medico?.idUsuario && this.medico.idUsuario != -1) {
        this.editProduct(this.medico);
      } else {
        this.addNewProduct(this.medico!);
      }
    }
  
    private addNewProduct(medico: Usuario): void {
      this.medicalService.createUsuario(medico)
        .subscribe({
          next: () => {
            this.isSaving = false;
            this.medicalService.displayTable$.next(true);
            this.medicalService.refreshTable$.next();
            Swal.fire({
              title: "Creado Exitoso!",
              text: "Se ha creado el medico exitosamente!",
              icon: "success"
            });
          }
        });
    }
  
    private editProduct(medico: Usuario): void {
      this.medicalService.editUsuario(medico)
        .subscribe({
          next: () => {
            this.isSaving = false;
            this.medicalService.displayTable$.next(true);
            this.medicalService.refreshTable$.next();
            Swal.fire({
              title: "Editado Exitoso!",
              text: "Se ha editado el medico exitosamente!",
              icon: "success"
            });
          }
        });
    }
}
