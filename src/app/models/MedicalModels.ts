export interface Usuario {
    idUsuario: number | null;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    idRol: number | null;
    fechaRegistro: Date | null;
    medicoEspecialidad: MedicoEspecialidad[];
}

export interface MedicoEspecialidad {
    idMedicoEspecialidad: number;
    idUsuario: number;
    idEspecialidad: number;
    especialidad: Especialidad;
}

export interface Especialidad {
    idEspecialidad: number | null;
    nombreEspecialidad: string;
    descripcion: string;
}

export interface Roles {
    idRol: number | null;
    nombreRol: string;
    descripcion: string;
}

export interface Cita {
    idCita: number | null;
    idUsuario: number;
    idMedicoEspecialidad: number;
    fechaCita: Date;
    estado: string;
}

export interface Turno {
    idTurno: number | null;
    idMedicoEspecialidad: number;
    fechaTurno: Date;
    fechaTurnoFin: Date;
}