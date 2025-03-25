import { Component } from '@angular/core';
import { TurnosFormComponent } from '../../../components/turnos/turnos-form/turnos-form.component';

@Component({
  selector: 'app-turnos-create',
  standalone: true,
  imports: [TurnosFormComponent],
  templateUrl: './turnos-create.component.html',
  styleUrl: './turnos-create.component.scss'
})
export class TurnosCreateComponent {

}
