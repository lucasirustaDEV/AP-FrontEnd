export class persona {
    id?: number;
    nombre: string;
    apellido: string;
    edad: number;

    constructor (nombre: string, apellido: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}