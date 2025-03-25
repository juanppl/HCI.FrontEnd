import { Component } from '@angular/core';
import { Roles } from '../../../models/MedicalModels';
import { Subscription } from 'rxjs';
import { MedicalService } from '../../../services/medical.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-admin-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './roles-admin-form.component.html',
  styleUrl: './roles-admin-form.component.scss'
})
export class RolesAdminFormComponent {
  public roles: Roles | null = this.initializeRoles();
  private subscription$: Subscription;
  public isSaving = false;

  constructor(private medicalService: MedicalService) {
    this.subscription$ = this.medicalService.selectedRol$
      .subscribe((Roles: Roles | null) => {
        this.roles = Roles;
        if (!this.roles) this.roles = this.initializeRoles();
      });
  }

  initializeRoles(): Roles {
    return {
      idRol: null,
      nombreRol: '',
      descripcion: ''
    }
  }

  public cancel(): void {
    this.medicalService.displayTable$.next(true);
  }

  public save(): void {
    this.isSaving = true;
    if (this.roles?.idRol && this.roles.idRol != -1) {
      this.editRoles(this.roles);
    } else {
      this.addNewRoles(this.roles!);
    }
  }

  private addNewRoles(Roles: Roles): void {
    this.medicalService.createRol(Roles)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.medicalService.displayTable$.next(true);
          this.medicalService.refreshTable$.next();
          Swal.fire({
            title: "Creado Exitoso!",
            text: "Se ha creado el Rol exitosamente!",
            icon: "success"
          });
        }
      });
  }

  private editRoles(Roles: Roles): void {
    this.medicalService.editRol(Roles)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.medicalService.displayTable$.next(true);
          this.medicalService.refreshTable$.next();
          Swal.fire({
            title: "Editado Exitoso!",
            text: "Se ha editado el Rol exitosamente!",
            icon: "success"
          });
        }
      });
  }
}
