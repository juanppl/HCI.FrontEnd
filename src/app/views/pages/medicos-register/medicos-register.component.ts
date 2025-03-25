import { Component } from '@angular/core';
import { Usuario } from '../../../models/MedicalModels';
import { Subscription } from 'rxjs';
import { MedicalService } from '../../../services/medical.service';
import { MedicosAdminTableComponent } from '../../../components/medicos-admin/medicos-admin-table/medicos-admin-table.component';
import { MedicosAdminFormComponent } from '../../../components/medicos-admin/medicos-admin-form/medicos-admin-form.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-medicos-register',
  standalone: true,
  imports: [SpinnerComponent, MedicosAdminTableComponent, MedicosAdminFormComponent],
  templateUrl: './medicos-register.component.html',
  styleUrl: './medicos-register.component.scss'
})
export class MedicosRegisterComponent {
  public isLoading = false;
  public medicos: Usuario[] = [];
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
        next: (medicos: Usuario[]) => {
          this.medicos = medicos.filter(p => p.idRol == 2);
          this.isLoading = false;
        }
      });
  }

  public addPaciente(): void {
    this.isTableShown = false;
    this.medicalService.selectedUsuario$.next(null);
  }
}
