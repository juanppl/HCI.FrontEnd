import { Component } from '@angular/core';
import { MedicalService } from '../../../services/medical.service';
import { Turno, Usuario } from '../../../models/MedicalModels';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turnos-form.component.html',
  styleUrl: './turnos-form.component.scss'
})
export class TurnosFormComponent {
public isLoading = false;
  public medicos: Usuario[] = [];
  public selectedMedico: Usuario = this.initializeProduct();
  public turnoInicioDate: Date | null = new Date();
  public turnoFinDate: Date | null = new Date();
  public turnoInicioTime: any = new Date();
  public turnoFinTime: any = new Date();
  public currentDate: Date = new Date();
  public isSaving: boolean = false;

  constructor(private medicalService: MedicalService) {}

  ngOnInit(): void {
    this.getAllUsers();
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

  getAllUsers() {
    this.isLoading = true;
    this.medicalService.getListOfUsers()
      .subscribe({
        next: (pacientes: Usuario[]) => {
          this.medicos = pacientes.filter(p => p.idRol == 2);
          this.isLoading = false;
        }
      });
  }

  crearTurno() {
    this.isSaving = true;
    const newTurno = {
      idTurno: null,
      idMedicoEspecialidad: this.selectedMedico.medicoEspecialidad[0].idMedicoEspecialidad,
      fechaTurno: this.combinarFechaYHora(this.turnoInicioDate, this.turnoInicioTime),
      fechaTurnoFin: this.combinarFechaYHora(this.turnoFinDate, this.turnoFinTime),
    } as Turno;
    this.medicalService.createTurno(newTurno)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.selectedMedico = this.initializeProduct();
          this.turnoInicioDate = new Date();
          this.turnoInicioTime = "";
          this.turnoFinDate = new Date();
          this.turnoFinTime = "";
          this.medicalService.displayTable$.next(true);
          this.medicalService.refreshTable$.next();
          Swal.fire({
            title: "Creado Exitoso!",
            text: "Se ha creado el turno exitosamente!",
            icon: "success"
          });
        }
      });
  }

  public assignInicioDate(event: any): void {
    this.turnoInicioDate = event.target.value;
  }

  public assignFinDate(event: any): void {
    this.turnoFinDate = event.target.value;
  }

  public assignInicioTime(event: any): void {
    this.turnoInicioTime = event.target.value;
  }

  public assignFinTime(event: any): void {
    this.turnoFinTime = event.target.value;
  }

  public combinarFechaYHora(date: any, time: any): Date | null {
    if (date && time) {
      // Extraemos los componentes de la fecha
      const cd = new Date(date);
      const year = cd.getUTCFullYear(); 
      const month = cd.getUTCMonth();
      const day = cd.getUTCDate();
      
      // Extraemos los componentes de la hora
      const [hours, minutes] = time.split(':').map(Number);
      
      // Creamos una nueva fecha combinada
      return new Date(year, month, day, hours, minutes);
    }
    return null;
  }
}
