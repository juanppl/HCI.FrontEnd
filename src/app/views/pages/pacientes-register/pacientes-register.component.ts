import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { PacientesAdminTableComponent } from '../../../components/pacientes-admin/pacientes-admin-table/pacientes-admin-table.component';
import { PacientesAdminFormComponent } from '../../../components/pacientes-admin/pacientes-admin-form/pacientes-admin-form.component';
import { Usuario } from '../../../models/MedicalModels';
import { Subscription } from 'rxjs';
import { MedicalService } from '../../../services/medical.service';

@Component({
  selector: 'app-pacientes-register',
  standalone: true,
  imports: [SpinnerComponent, PacientesAdminTableComponent, PacientesAdminFormComponent],
  templateUrl: './pacientes-register.component.html',
  styleUrl: './pacientes-register.component.scss'
})
export class PacientesRegisterComponent implements OnInit, OnDestroy {
  
  public isLoading = false;
  public pacientes: Usuario[] = [];
  public isTableShown: boolean = true;

  private subscription$: Subscription;
  private subscriptionTable$: Subscription;

  constructor(private medicalService: MedicalService) {
    this.subscription$ = this.medicalService.refreshTable$.subscribe(_ => this.getAllUsers());
    this.subscriptionTable$ = this.medicalService.displayTable$.subscribe(isShown => this.isTableShown = isShown);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscriptionTable$.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllUsers();
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

  public addPaciente(): void {
    this.isTableShown = false;
    this.medicalService.selectedUsuario$.next(null);
  }

}
