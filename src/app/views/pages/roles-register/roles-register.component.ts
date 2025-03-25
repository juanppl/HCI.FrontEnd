import { Component } from '@angular/core';
import { Roles } from '../../../models/MedicalModels';
import { Subscription } from 'rxjs';
import { MedicalService } from '../../../services/medical.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { RolesAdminTableComponent } from '../../../components/roles-admin/roles-admin-table/roles-admin-table.component';
import { RolesAdminFormComponent } from '../../../components/roles-admin/roles-admin-form/roles-admin-form.component';

@Component({
  selector: 'app-roles-register',
  standalone: true,
  imports: [SpinnerComponent, RolesAdminTableComponent, RolesAdminFormComponent],
  templateUrl: './roles-register.component.html',
  styleUrl: './roles-register.component.scss'
})
export class RolesRegisterComponent {
  public isLoading = false;
  public roles: Roles[] = [];
  public isTableShown: boolean = true;

  private subscription$: Subscription;
  private subscriptionTable$: Subscription;

  constructor(private medicalService: MedicalService) {
    this.subscription$ = this.medicalService.refreshTable$.subscribe(_ => this.getAllRoles());
    this.subscriptionTable$ = this.medicalService.displayTable$.subscribe(isShown => this.isTableShown = isShown);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscriptionTable$.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.isLoading = true;
    this.medicalService.getListOfRoles()
      .subscribe({
        next: (roles: Roles[]) => {
          this.roles = roles;
          this.isLoading = false;
        }
      });
  }

  public addRol(): void {
    this.isTableShown = false;
    this.medicalService.selectedUsuario$.next(null);
  }
}
