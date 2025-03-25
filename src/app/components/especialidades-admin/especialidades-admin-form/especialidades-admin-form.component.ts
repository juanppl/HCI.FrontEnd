import { Component } from '@angular/core';
import { Especialidad } from '../../../models/MedicalModels';
import { Subscription } from 'rxjs';
import { MedicalService } from '../../../services/medical.service';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidades-admin-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './especialidades-admin-form.component.html',
  styleUrl: './especialidades-admin-form.component.scss'
})
export class EspecialidadesAdminFormComponent {
  public especialidad: Especialidad | null = this.initializeEspecialidad();
  private subscription$: Subscription;
  public isSaving = false;

  constructor(private medicalService: MedicalService) {
    this.subscription$ = this.medicalService.selectedEspecialidad$
      .subscribe((especialidad: Especialidad | null) => {
        this.especialidad = especialidad;
        if (!this.especialidad) this.especialidad = this.initializeEspecialidad();
      });
  }

  initializeEspecialidad(): Especialidad {
    return {
      idEspecialidad: null,
      nombreEspecialidad: '',
      descripcion: ''
    }
  }

  public cancel(): void {
    this.medicalService.displayTable$.next(true);
  }

  public save(): void {
    this.isSaving = true;
    if (this.especialidad?.idEspecialidad && this.especialidad.idEspecialidad != -1) {
      this.editEspecialidad(this.especialidad);
    } else {
      this.addNewEspecialidad(this.especialidad!);
    }
  }

  private addNewEspecialidad(especialidad: Especialidad): void {
    this.medicalService.createEspecialidad(especialidad)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.medicalService.displayTable$.next(true);
          this.medicalService.refreshTable$.next();
          Swal.fire({
            title: "Creado Exitoso!",
            text: "Se ha creado la especialidad exitosamente!",
            icon: "success"
          });
        }
      });
  }

  private editEspecialidad(especialidad: Especialidad): void {
    this.medicalService.editEspecialidad(especialidad)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.medicalService.displayTable$.next(true);
          this.medicalService.refreshTable$.next();
          Swal.fire({
            title: "Editado Exitoso!",
            text: "Se ha editado la especialidad exitosamente!",
            icon: "success"
          });
        }
      });
  }
}
