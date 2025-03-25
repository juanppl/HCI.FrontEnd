import { Component, Input } from '@angular/core';
import { Cita } from '../../../models/MedicalModels';
import { CitaOutput } from '../../../services/medical.service';

@Component({
  selector: 'app-historico-usuario-table',
  standalone: true,
  imports: [],
  templateUrl: './historico-usuario-table.component.html',
  styleUrl: './historico-usuario-table.component.scss'
})
export class HistoricoUsuarioTableComponent {
  @Input({required: true}) userHistory: CitaOutput[] = [];
}
