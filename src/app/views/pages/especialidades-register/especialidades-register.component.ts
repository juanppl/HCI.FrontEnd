import { Component } from '@angular/core';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { Especialidad } from '../../../models/MedicalModels';
import { Subscription } from 'rxjs';
import { MedicalService } from '../../../services/medical.service';
import { EspecialidadesAdminTableComponent } from '../../../components/especialidades-admin/especialidades-admin-table/especialidades-admin-table.component';
import { EspecialidadesAdminFormComponent } from '../../../components/especialidades-admin/especialidades-admin-form/especialidades-admin-form.component';

@Component({
  selector: 'app-especialidades-register',
  standalone: true,
  imports: [SpinnerComponent, EspecialidadesAdminTableComponent, EspecialidadesAdminFormComponent],
  templateUrl: './especialidades-register.component.html',
  styleUrl: './especialidades-register.component.scss'
})
export class EspecialidadesRegisterComponent {
public isLoading = false;
  public especialidad: Especialidad[] = [];
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
    this.medicalService.getListOfEspecialidades()
      .subscribe({
        next: (especialidad: Especialidad[]) => {
          this.especialidad = especialidad;
          this.isLoading = false;
        }
      });
  }

  public addEspecialidad(): void {
    this.isTableShown = false;
    this.medicalService.selectedEspecialidad$.next(null);
  }
}
