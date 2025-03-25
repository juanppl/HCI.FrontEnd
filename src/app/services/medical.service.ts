import { Injectable } from '@angular/core';
import { catchError, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { Cita, Especialidad, Roles, Turno, Usuario } from '../models/MedicalModels';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  public refreshTable$: Subject<void> = new Subject<void>();
  public selectedUsuario$: ReplaySubject<Usuario | null> = new ReplaySubject<Usuario | null>();
  public selectedUsuarioHistorial$: ReplaySubject<Usuario | null> = new ReplaySubject<Usuario | null>();
  public selectedEspecialidad$: ReplaySubject<Especialidad | null> = new ReplaySubject<Especialidad | null>();
  public selectedRol$: ReplaySubject<Roles | null> = new ReplaySubject<Roles | null>();
  public displayTable$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public getListOfUsers(): Observable<Usuario[]> {
    const url = `${environment.api}Usuario`;
    return this.http.get<Usuario[]>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting List of Usuarios',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public createUsuario(Usuario: Usuario): Observable<Usuario> {
    const url = `${environment.api}Usuario`;
    return this.http.post<Usuario>(url, Usuario)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Usuario',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public editUsuario(Usuario: Usuario): Observable<Usuario> {
    const url = `${environment.api}Usuario/${Usuario.idUsuario}`;
    return this.http.put<Usuario>(url, Usuario)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when editing Usuario',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public getListOfEspecialidades(): Observable<Especialidad[]> {
    const url = `${environment.api}Especialidad`;
    return this.http.get<Especialidad[]>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting List of Especialidad',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    const url = `${environment.api}Especialidad`;
    return this.http.post<Especialidad>(url, especialidad)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating especialidad',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public editEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    const url = `${environment.api}Especialidad/${especialidad.idEspecialidad}`;
    return this.http.put<Especialidad>(url, especialidad)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when editing Especialidad',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public getListOfRoles(): Observable<Roles[]> {
    const url = `${environment.api}Rol`;
    return this.http.get<Roles[]>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting List of Roles',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public createRol(rol: Roles): Observable<Roles> {
    const url = `${environment.api}Rol`;
    return this.http.post<Roles>(url, rol)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Rol',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public editRol(rol: Roles): Observable<Roles> {
    const url = `${environment.api}Rol/${rol.idRol}`;
    return this.http.put<Roles>(url, rol)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when editing Rol',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public createCita(cita: Cita): Observable<Cita> {
    const url = `${environment.api}Cita`;
    return this.http.post<Cita>(url, cita)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Cita',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public createTurno(turno: Turno): Observable<Turno> {
    const url = `${environment.api}Turno`;
    return this.http.post<Turno>(url, turno)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Turno',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }

  public getListOfUserHistory(idUsuario: number): Observable<CitaOutput[]> {
    const url = `${environment.api}Cita/${idUsuario}`;
    return this.http.get<CitaOutput[]>(url)
      .pipe(
        map((products: CitaOutput[]) => {
          products.forEach((cita: CitaOutput) => {
            cita.fechaCitaS = this.datePipe.transform(cita.fechaCita, 'yyyy-MM-dd HH:mm:ss');
          });
          return products;
        }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting List of Usuario History',
            html: `${err.error.Message} ${err.error.Id}`
          });
          return [];
        })
      );
  }
}

export interface CitaOutput {
  idCita: number;
  idUsuario: number;
  idMedicoEspecialidad: number;
  fechaCita: Date;
  fechaCitaS: string | null;
  estado: string;
  paciente: PacienteOutput;
  medicoEspecialidad: MedicoEspecialidadOutput;
}

export interface MedicoEspecialidadOutput {
  idMedicoEspecialidad: number;
  idUsuario: number;
  idEspecialidad: number;
  fechaIngreso: Date;
  usuario: PacienteOutput;
  especialidad: EspecialidadOutput;
}

export interface EspecialidadOutput {
  idEspecialidad: number;
  nombreEspecialidad: string;
  descripcion: string;
}

export interface PacienteOutput {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
}
