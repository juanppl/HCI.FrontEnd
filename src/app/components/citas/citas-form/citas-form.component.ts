import { Component } from '@angular/core';
import { Cita, Usuario } from '../../../models/MedicalModels';
import { MedicalService } from '../../../services/medical.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas-form.component.html',
  styleUrl: './citas-form.component.scss'
})
export class CitasFormComponent {

  public isLoading = false;
  public pacientes: Usuario[] = [];
  public medicos: Usuario[] = [];
  public selectedPaciente: Usuario = this.initializeProduct();
  public selectedMedico: Usuario = this.initializeProduct();
  public citaDate: Date | null = new Date();
  public citaTime: any = new Date();
  public currentDate: Date = new Date();
  public isSaving = false;

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
          this.pacientes = pacientes.filter(p => p.idRol == 1);
          this.medicos = pacientes.filter(p => p.idRol == 2);
          this.isLoading = false;
        }
      });
  }

  crearCita() {
    this.isSaving = true;
    const newCita = {
      idCita: null,
      idUsuario: this.selectedPaciente.idUsuario,
      idMedicoEspecialidad: this.selectedMedico.medicoEspecialidad[0].idMedicoEspecialidad,
      estado: 'Pendiente',
      fechaCita: this.combinarFechaYHora()
    } as Cita;
    this.medicalService.createCita(newCita)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.selectedPaciente = this.initializeProduct();
          this.selectedMedico = this.initializeProduct();
          this.citaDate = new Date();
          this.citaTime = "";
          this.medicalService.displayTable$.next(true);
          this.medicalService.refreshTable$.next();
          Swal.fire({
            title: "Creado Exitoso!",
            text: "Se ha creado la cita exitosamente!",
            icon: "success"
          });
        }
      });
  }

  public assignExpireDate(event: any): void {
    this.citaDate = event.target.value;
  }

  public assignExpireTime(event: any): void {
    this.citaTime = event.target.value;
  }

  public combinarFechaYHora(): Date | null {
    if (this.citaDate && this.citaTime) {
      // Extraemos los componentes de la fecha
      const cd = new Date(this.citaDate);
      const year = cd.getUTCFullYear(); 
      const month = cd.getUTCMonth();
      const day = cd.getUTCDate();
      
      // Extraemos los componentes de la hora
      const [hours, minutes] = this.citaTime.split(':').map(Number);
      
      // Creamos una nueva fecha combinada
      return new Date(year, month, day, hours, minutes);
    }
    return null;
  }
}
