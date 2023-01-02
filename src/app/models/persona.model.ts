export class persona {
    id?: number;
    nombre: string;
    apellido: string;
    edad: number;
    acerca: string;
    imgperfil: string;

    constructor (nombre: string, apellido: string, edad: number, acerca: string, imgperfil: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.acerca = acerca;
        this.imgperfil = imgperfil;
    }
}