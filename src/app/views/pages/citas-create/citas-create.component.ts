import { Component } from '@angular/core';
import { CitasFormComponent } from '../../../components/citas/citas-form/citas-form.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-citas-create',
  standalone: true,
  imports: [SpinnerComponent, CitasFormComponent],
  templateUrl: './citas-create.component.html',
  styleUrl: './citas-create.component.scss'
})
export class CitasCreateComponent {

}
